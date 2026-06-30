import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

type CookieCall = {
  name: string;
  options: Record<string, unknown>;
};

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createAdminContext(): { ctx: TrpcContext; clearedCookies: CookieCall[] } {
  const clearedCookies: CookieCall[] = [];
  return {
    ctx: {
      user: {
        id: 1,
        openId: "admin-user",
        email: "admin@littleavanursery.co.uk",
        name: "Admin User",
        loginMethod: "manus",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      },
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {
        clearCookie: (name: string, options: Record<string, unknown>) => {
          clearedCookies.push({ name, options });
        },
      } as TrpcContext["res"],
    },
    clearedCookies,
  };
}

function createParentContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "parent-user",
      email: "parent@example.com",
      name: "Parent User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("auth.me", () => {
  it("returns null for unauthenticated user", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("returns user for authenticated admin", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeDefined();
    expect(result?.name).toBe("Admin User");
    expect(result?.role).toBe("admin");
  });

  it("returns user for authenticated parent", async () => {
    const ctx = createParentContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeDefined();
    expect(result?.name).toBe("Parent User");
    expect(result?.role).toBe("user");
  });
});

describe("auth.logout", () => {
  it("clears the session cookie and reports success", async () => {
    const { ctx, clearedCookies } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
    expect(clearedCookies[0]?.options).toMatchObject({
      maxAge: -1,
      secure: true,
      sameSite: "none",
      httpOnly: true,
      path: "/",
    });
  });
});

describe("router structure", () => {
  it("has all expected procedure routes defined", () => {
    const routerKeys = Object.keys(appRouter._def.procedures);
    // Core auth
    expect(routerKeys).toContain("auth.me");
    expect(routerKeys).toContain("auth.logout");
    // Public features
    expect(routerKeys).toContain("waitingList.join");
    expect(routerKeys).toContain("waitingList.list");
    expect(routerKeys).toContain("visits.book");
    expect(routerKeys).toContain("visits.list");
    expect(routerKeys).toContain("contact.send");
    expect(routerKeys).toContain("contact.list");
    // Protected parent features
    expect(routerKeys).toContain("children.register");
    expect(routerKeys).toContain("children.myChildren");
    expect(routerKeys).toContain("sessions.request");
    expect(routerKeys).toContain("sessions.myBookings");
    expect(routerKeys).toContain("absences.report");
    expect(routerKeys).toContain("absences.myAbsences");
    expect(routerKeys).toContain("activities.getRecent");
    expect(routerKeys).toContain("notifications.myNotifications");
    // Admin features
    expect(routerKeys).toContain("admin.stats");
    expect(routerKeys).toContain("admin.broadcastNotification");
    expect(routerKeys).toContain("news.list");
    expect(routerKeys).toContain("news.create");
    expect(routerKeys).toContain("staff.list");
    expect(routerKeys).toContain("attendance.todayList");
    expect(routerKeys).toContain("attendance.checkIn");
    expect(routerKeys).toContain("attendance.checkOut");
  });
});

describe("access control", () => {
  it("admin.stats throws for unauthenticated users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.admin.stats()).rejects.toThrow();
  });

  it("admin.stats throws for regular users", async () => {
    const ctx = createParentContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.admin.stats()).rejects.toThrow();
  });

  it("children.register throws for unauthenticated users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.children.register({
        firstName: "Test",
        lastName: "Child",
        dateOfBirth: "2023-01-01",
      })
    ).rejects.toThrow();
  });
});
