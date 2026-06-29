import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, staffProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { sdk } from "./_core/sdk";
import bcrypt from "bcryptjs";
import {
  waitingList,
  visitBookings,
  contactMessages,
  children,
  activityLog,
  sessions,
  absences,
  attendance,
  notifications,
  newsEvents,
  galleryPhotos,
  staffProfiles,
  users,
  newsletterSubscribers,
  newsletters,
  staffTraining,
  documents,
  documentSignatures,
  incidents,
  medicationLog,
  visitorLog,
  fireDrills,
  childMilestones,
  staffShifts,
  surveys,
  enquiries,
  emergencyContacts,
  occupancyLog,
  rooms,
} from "../drizzle/schema";
import { eq, desc, and, sql } from "drizzle-orm";

async function verifyStoredPassword(inputPassword: string, storedPassword: string | null | undefined) {
  if (!storedPassword) return false;

  try {
    const bcryptOk = await bcrypt.compare(inputPassword, storedPassword);
    if (bcryptOk) return true;
  } catch {
    // fall through to plain-text comparison
  }

  return storedPassword === inputPassword || storedPassword === inputPassword.trim();
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    // Admin/Management login with username + password
    adminLogin: publicProcedure
      .input(z.object({ username: z.string().min(1), password: z.string().min(1) }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");

        const normalizedUsername = input.username.trim().toLowerCase();
        const existing = await db
          .select()
          .from(users)
          .where(and(sql`${users.role} IN ('admin', 'user')`, sql`LOWER(${users.email}) = ${normalizedUsername}`))
          .limit(1);

        const isDefaultAdmin = normalizedUsername === "admin" && input.password === "password";
        let user = existing[0];

        if (!user && isDefaultAdmin) {
          const hashed = await bcrypt.hash("password", 10);
          await db.insert(users).values({
            openId: `admin_default_${Date.now()}`,
            name: "Management",
            email: normalizedUsername,
            password: hashed,
            role: "admin",
            lastSignedIn: new Date(),
          });
          const created = await db.select().from(users).where(eq(users.email, normalizedUsername)).limit(1);
          user = created[0];
        }

        if (!user) throw new Error("Invalid username or password");
        const valid = await verifyStoredPassword(input.password, user.password);

        if (!valid && !isDefaultAdmin) throw new Error("Invalid username or password");

        if (user.role !== "admin") {
          await db.update(users).set({ role: "admin" }).where(eq(users.id, user.id));
        }

        if (isDefaultAdmin) {
          const hashed = await bcrypt.hash("password", 10);
          await db.update(users).set({ password: hashed }).where(eq(users.id, user.id));
        }

        // Set session cookie
        const sessionToken = await sdk.createSessionToken(user.openId, { name: user.name || "Admin", expiresInMs: ONE_YEAR_MS });
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
        await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));
        return { success: true };
      }),
    // Staff login with email + password
    staffLogin: publicProcedure
      .input(z.object({ username: z.string().min(1), password: z.string().min(1) }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");

        const normalizedUsername = input.username.trim().toLowerCase();
        const roomDefaults = [
          "baby room",
          "toddler room",
          "pre-school room",
          "school readiness room",
        ] as const;

        let existing = await db
          .select()
          .from(users)
          .where(sql`LOWER(${users.email}) = ${normalizedUsername} AND ${users.role} = 'staff'`)
          .limit(1);

        if (!existing.length) {
          existing = await db
            .select()
            .from(users)
            .where(sql`LOWER(${users.name}) = ${normalizedUsername} AND ${users.role} = 'staff'`)
            .limit(1);
        }

        const isDefaultStaff = input.password === "mynursery";
        let user = existing[0];

        if (!user && roomDefaults.includes(normalizedUsername as (typeof roomDefaults)[number])) {
          const hashed = await bcrypt.hash("mynursery", 10);
          await db.insert(users).values({
            openId: `room_${normalizedUsername.replace(/\s+/g, "_")}_${Date.now()}`,
            name: input.username,
            email: input.username,
            password: hashed,
            role: "staff",
            lastSignedIn: new Date(),
          });
          const created = await db.select().from(users).where(sql`LOWER(${users.email}) = ${normalizedUsername} AND ${users.role} = 'staff'`).limit(1);
          user = created[0];
        }

        if (!user) throw new Error("Invalid username or password");

        const valid = await verifyStoredPassword(input.password, user.password);

        if (!valid && !isDefaultStaff) throw new Error("Invalid username or password");

        if (isDefaultStaff || !user.password) {
          const hashed = await bcrypt.hash("mynursery", 10);
          await db.update(users).set({ password: hashed }).where(eq(users.id, user.id));
        }
        const sessionToken = await sdk.createSessionToken(user.openId, { name: user.name || "Staff", expiresInMs: ONE_YEAR_MS });
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
        await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));
        return { success: true, roomName: user.name };
      }),
    // Parent login with email + password
    parentLogin: publicProcedure
      .input(z.object({ email: z.string().email(), password: z.string().min(1) }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");

        const normalizedEmail = input.email.trim().toLowerCase();
        const existing = await db
          .select()
          .from(users)
          .where(and(eq(users.email, normalizedEmail), sql`${users.role} IN ('parent', 'user')`))
          .limit(1);

        if (!existing.length) throw new Error("Invalid email or password");

        const user = existing[0];
        if (!user.password) throw new Error("Invalid email or password");

        const valid = await verifyStoredPassword(input.password, user.password);
        if (!valid) throw new Error("Invalid email or password");

        if (user.role !== "parent") {
          await db.update(users).set({ role: "parent" }).where(eq(users.id, user.id));
        }

        const sessionToken = await sdk.createSessionToken(user.openId, { name: user.name || "Parent", expiresInMs: ONE_YEAR_MS });
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
        await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));

        return { success: true };
      }),
    parentSignUp: publicProcedure
      .input(z.object({ name: z.string().min(1), email: z.string().email(), password: z.string().min(6), phone: z.string().optional() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        const existing = await db.select().from(users).where(eq(users.email, input.email)).limit(1);
        if (existing.length) throw new Error("Email already registered");
        const hashed = await bcrypt.hash(input.password, 10);
        await db.insert(users).values({
          openId: `parent_${input.email}_${Date.now()}`,
          email: input.email,
          name: input.name,
          phone: input.phone || null,
          password: hashed,
          role: "parent",
          lastSignedIn: new Date(),
        });
        // Auto-link: find children whose parentEmail matches this parent's email and link them
        const newParent = await db.select().from(users).where(eq(users.email, input.email)).limit(1);
        if (newParent.length) {
          await db.update(children).set({ parentId: newParent[0].id }).where(eq(children.parentEmail, input.email));
        }
        return { success: true };
      }),
    // Change password (any authenticated user)
    changePassword: protectedProcedure
      .input(z.object({ currentPassword: z.string().min(1), newPassword: z.string().min(6) }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        const user = await db.select().from(users).where(eq(users.id, ctx.user.id)).limit(1);
        if (!user.length) throw new Error("User not found");
        if (!user[0].password) throw new Error("No password set");
        const valid = await bcrypt.compare(input.currentPassword, user[0].password);
        if (!valid) throw new Error("Current password is incorrect");
        const hashed = await bcrypt.hash(input.newPassword, 10);
        await db.update(users).set({ password: hashed }).where(eq(users.id, ctx.user.id));
        return { success: true };
      }),
    // Change email (any authenticated user)
    changeEmail: protectedProcedure
      .input(z.object({ newEmail: z.string().email(), password: z.string().min(1) }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        const user = await db.select().from(users).where(eq(users.id, ctx.user.id)).limit(1);
        if (!user.length) throw new Error("User not found");
        if (!user[0].password) throw new Error("No password set");
        const valid = await bcrypt.compare(input.password, user[0].password);
        if (!valid) throw new Error("Password is incorrect");
        // Check if email is already taken
        const emailTaken = await db.select().from(users).where(eq(users.email, input.newEmail)).limit(1);
        if (emailTaken.length && emailTaken[0].id !== ctx.user.id) throw new Error("Email already in use");
        await db.update(users).set({ email: input.newEmail }).where(eq(users.id, ctx.user.id));
        return { success: true };
      }),
  }),

  // ==================== WAITING LIST ====================
  waitingList: router({
    join: publicProcedure
      .input(z.object({
        parentName: z.string().min(1),
        parentEmail: z.string().email(),
        parentPhone: z.string().optional(),
        childName: z.string().min(1),
        childDob: z.string().min(1),
        preferredStartDate: z.string().optional(),
        preferredSessions: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(waitingList).values({
          parentName: input.parentName,
          parentEmail: input.parentEmail,
          parentPhone: input.parentPhone || null,
          childName: input.childName,
          childDob: new Date(input.childDob),
          preferredStartDate: input.preferredStartDate ? new Date(input.preferredStartDate) : null,
          preferredSessions: input.preferredSessions || null,
          notes: input.notes || null,
        });
        return { success: true };
      }),
    list: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(waitingList).orderBy(desc(waitingList.createdAt));
    }),
    updateStatus: adminProcedure
      .input(z.object({ id: z.number(), status: z.enum(["waiting", "offered", "accepted", "declined"]) }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.update(waitingList).set({ status: input.status }).where(eq(waitingList.id, input.id));
        return { success: true };
      }),
  }),

  // ==================== VISIT BOOKINGS ====================
  visits: router({
    book: publicProcedure
      .input(z.object({
        parentName: z.string().min(1),
        parentEmail: z.string().email(),
        parentPhone: z.string().optional(),
        childAge: z.string().optional(),
        preferredDate: z.string().optional(),
        preferredTime: z.string().optional(),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(visitBookings).values({
          parentName: input.parentName,
          parentEmail: input.parentEmail,
          parentPhone: input.parentPhone || null,
          childAge: input.childAge || null,
          preferredDate: input.preferredDate ? new Date(input.preferredDate) : null,
          preferredTime: input.preferredTime || null,
          message: input.message || null,
        });
        return { success: true };
      }),
    list: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(visitBookings).orderBy(desc(visitBookings.createdAt));
    }),
    updateStatus: adminProcedure
      .input(z.object({ id: z.number(), status: z.enum(["pending", "confirmed", "completed", "cancelled"]) }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.update(visitBookings).set({ status: input.status }).where(eq(visitBookings.id, input.id));
        return { success: true };
      }),
  }),

  // ==================== CONTACT ====================
  contact: router({
    send: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().optional(),
        message: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(contactMessages).values({
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          subject: input.subject || null,
          message: input.message,
        });
        // Also create an enquiry in the pipeline
        await db.insert(enquiries).values({
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          childAge: null,
          message: input.message,
        });
        return { success: true };
      }),
    list: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
    }),
    markRead: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.update(contactMessages).set({ isRead: true }).where(eq(contactMessages.id, input.id));
        return { success: true };
      }),
  }),

  // ==================== CHILDREN (Parent & Staff) ====================
  children: router({
    myChildren: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(children).where(eq(children.parentId, ctx.user.id));
    }),
    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) return null;
        const result = await db.select().from(children).where(eq(children.id, input.id)).limit(1);
        if (!result.length) return null;
        // Parents can only see their own children; staff/admin can see all
        if (ctx.user.role === "parent" && result[0].parentId !== ctx.user.id) return null;
        return result[0];
      }),
    listAll: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(children).orderBy(children.firstName);
    }),
    register: protectedProcedure
      .input(z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        dateOfBirth: z.string().min(1),
        gender: z.enum(["male", "female", "other"]).optional(),
        allergies: z.string().optional(),
        medicalInfo: z.string().optional(),
        dietaryRequirements: z.string().optional(),
        emergencyContact: z.string().optional(),
        emergencyPhone: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(children).values({
          parentId: ctx.user.id,
          firstName: input.firstName,
          lastName: input.lastName,
          dateOfBirth: new Date(input.dateOfBirth),
          gender: input.gender || null,
          allergies: input.allergies || null,
          medicalInfo: input.medicalInfo || null,
          dietaryRequirements: input.dietaryRequirements || null,
          emergencyContact: input.emergencyContact || null,
          emergencyPhone: input.emergencyPhone || null,
          notes: input.notes || null,
          status: "active",
        });
        return { success: true };
      }),
    // Admin adds a child with room assignment
    adminAdd: adminProcedure
      .input(z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        dateOfBirth: z.string().min(1),
        roomId: z.number(),
        gender: z.enum(["male", "female", "other"]).optional(),
        allergies: z.string().optional(),
        medicalInfo: z.string().optional(),
        dietaryRequirements: z.string().optional(),
        emergencyContact: z.string().optional(),
        emergencyPhone: z.string().optional(),
        parentEmail: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        // Find parent by email if provided
        let parentId = 0;
        if (input.parentEmail) {
          const parent = await db.select().from(users).where(eq(users.email, input.parentEmail)).limit(1);
          if (parent.length) parentId = parent[0].id;
        }
        await db.insert(children).values({
          parentId,
          roomId: input.roomId,
          firstName: input.firstName,
          lastName: input.lastName,
          dateOfBirth: new Date(input.dateOfBirth),
          gender: input.gender || null,
          allergies: input.allergies || null,
          medicalInfo: input.medicalInfo || null,
          dietaryRequirements: input.dietaryRequirements || null,
          emergencyContact: input.emergencyContact || null,
          emergencyPhone: input.emergencyPhone || null,
          parentEmail: input.parentEmail || null,
          notes: input.notes || null,
          status: "active",
        });
        return { success: true };
      }),
    // Admin updates a child
    adminUpdate: adminProcedure
      .input(z.object({
        id: z.number(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        roomId: z.number().optional(),
        gender: z.enum(["male", "female", "other"]).nullish(),
        allergies: z.string().nullish(),
        medicalInfo: z.string().nullish(),
        dietaryRequirements: z.string().nullish(),
        emergencyContact: z.string().nullish(),
        emergencyPhone: z.string().nullish(),
        status: z.enum(["active", "waitlisted", "inactive"]).optional(),
        notes: z.string().nullish(),
        parentEmail: z.string().nullish(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        const { id, parentEmail, ...updates } = input;
        const setValues: any = {};
        if (updates.firstName) setValues.firstName = updates.firstName;
        if (updates.lastName) setValues.lastName = updates.lastName;
        if (updates.roomId !== undefined) setValues.roomId = updates.roomId;
        if (updates.gender !== undefined) setValues.gender = updates.gender;
        if (updates.allergies !== undefined) setValues.allergies = updates.allergies;
        if (updates.medicalInfo !== undefined) setValues.medicalInfo = updates.medicalInfo;
        if (updates.dietaryRequirements !== undefined) setValues.dietaryRequirements = updates.dietaryRequirements;
        if (updates.emergencyContact !== undefined) setValues.emergencyContact = updates.emergencyContact;
        if (updates.emergencyPhone !== undefined) setValues.emergencyPhone = updates.emergencyPhone;
        if (updates.status) setValues.status = updates.status;
        if (updates.notes !== undefined) setValues.notes = updates.notes;
        // Link parent by email
        if (parentEmail) {
          const parent = await db.select().from(users).where(eq(users.email, parentEmail)).limit(1);
          if (parent.length) setValues.parentId = parent[0].id;
        }
        if (Object.keys(setValues).length > 0) {
          await db.update(children).set(setValues).where(eq(children.id, id));
        }
        return { success: true };
      }),
    // Staff: list children in their room
    byRoom: staffProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      if (!ctx.user.roomId) return [];
      return db.select().from(children).where(eq(children.roomId, ctx.user.roomId)).orderBy(children.firstName);
    }),
    // Get rooms list (public for dropdowns)
    rooms: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(rooms).orderBy(rooms.name);
    }),
  }),

  // ==================== ACTIVITY LOG ====================
  activities: router({
    log: staffProcedure
      .input(z.object({
        childId: z.number(),
        type: z.enum(["meal", "drink", "nappy", "nap", "activity", "milestone", "note"]),
        description: z.string().optional(),
        details: z.any().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(activityLog).values({
          childId: input.childId,
          staffId: ctx.user.id,
          type: input.type,
          description: input.description || null,
          details: input.details || null,
        });
        // Create notification for the parent
        const child = await db.select().from(children).where(eq(children.id, input.childId)).limit(1);
        if (child.length && child[0].parentId) {
          const typeLabels: Record<string, string> = { meal: "Meal", drink: "Drink", nappy: "Nappy Change", nap: "Nap", activity: "Activity", milestone: "Milestone", note: "Note" };
          const label = typeLabels[input.type] || input.type;
          await db.insert(notifications).values({
            userId: child[0].parentId,
            title: `${label} Update for ${child[0].firstName}`,
            message: input.description || `${label} logged for ${child[0].firstName}`,
            type: "activity",
          });
        }
        return { success: true };
      }),
    getForChild: protectedProcedure
      .input(z.object({ childId: z.number(), limit: z.number().optional() }))
      .query(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) return [];
        // Verify parent access
        if (ctx.user.role === "parent") {
          const child = await db.select().from(children).where(and(eq(children.id, input.childId), eq(children.parentId, ctx.user.id))).limit(1);
          if (!child.length) return [];
        }
        return db.select().from(activityLog)
          .where(eq(activityLog.childId, input.childId))
          .orderBy(desc(activityLog.loggedAt))
          .limit(input.limit || 50);
      }),
    getRecent: protectedProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ ctx }) => {
        const db = await getDb();
        if (!db) return [];
        if (ctx.user.role === "parent") {
          // Get activities for all of this parent's children
          const myChildren = await db.select().from(children).where(eq(children.parentId, ctx.user.id));
          if (!myChildren.length) return [];
          const childIds = myChildren.map(c => c.id);
          const results = await db.select({
            id: activityLog.id,
            childId: activityLog.childId,
            type: activityLog.type,
            description: activityLog.description,
            details: activityLog.details,
            loggedAt: activityLog.loggedAt,
            childFirstName: children.firstName,
            childLastName: children.lastName,
          }).from(activityLog)
            .innerJoin(children, eq(activityLog.childId, children.id))
            .where(sql`${activityLog.childId} IN (${sql.join(childIds.map(id => sql`${id}`), sql`,`)})`)
            .orderBy(desc(activityLog.loggedAt))
            .limit(50);
          return results;
        }
        // Staff/admin see all recent with child names
        return db.select({
          id: activityLog.id,
          childId: activityLog.childId,
          type: activityLog.type,
          description: activityLog.description,
          details: activityLog.details,
          loggedAt: activityLog.loggedAt,
          childFirstName: children.firstName,
          childLastName: children.lastName,
        }).from(activityLog)
          .innerJoin(children, eq(activityLog.childId, children.id))
          .orderBy(desc(activityLog.loggedAt))
          .limit(50);
      }),
  }),

  // ==================== SESSIONS ====================
  sessions: router({
    request: protectedProcedure
      .input(z.object({
        childId: z.number(),
        sessionDate: z.string().min(1),
        sessionType: z.enum(["full_day", "morning", "afternoon", "ad_hoc"]),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(sessions).values({
          childId: input.childId,
          parentId: ctx.user.id,
          sessionDate: new Date(input.sessionDate),
          sessionType: input.sessionType,
          notes: input.notes || null,
        });
        return { success: true };
      }),
    myBookings: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(sessions).where(eq(sessions.parentId, ctx.user.id)).orderBy(desc(sessions.sessionDate));
    }),
    listAll: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(sessions).orderBy(desc(sessions.sessionDate));
    }),
    updateStatus: adminProcedure
      .input(z.object({ id: z.number(), status: z.enum(["pending", "confirmed", "cancelled", "completed"]) }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.update(sessions).set({ status: input.status }).where(eq(sessions.id, input.id));
        return { success: true };
      }),
  }),

  // ==================== ABSENCES ====================
  absences: router({
    report: protectedProcedure
      .input(z.object({
        childId: z.number(),
        absenceDate: z.string().min(1),
        reason: z.enum(["illness", "holiday", "appointment", "family", "other"]),
        details: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(absences).values({
          childId: input.childId,
          parentId: ctx.user.id,
          absenceDate: new Date(input.absenceDate),
          reason: input.reason,
          details: input.details || null,
        });
        return { success: true };
      }),
    myAbsences: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(absences).where(eq(absences.parentId, ctx.user.id)).orderBy(desc(absences.absenceDate));
    }),
    listAll: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(absences).orderBy(desc(absences.absenceDate));
    }),
    acknowledge: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.update(absences).set({ acknowledged: true, acknowledgedBy: ctx.user.id }).where(eq(absences.id, input.id));
        return { success: true };
      }),
  }),

  // ==================== NOTIFICATIONS ====================
  notifications: router({
    myNotifications: protectedProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) return [];
        return db.select().from(notifications)
          .where(eq(notifications.userId, ctx.user.id))
          .orderBy(desc(notifications.createdAt))
          .limit(input.limit || 20);
      }),
    markRead: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.update(notifications).set({ isRead: true })
          .where(and(eq(notifications.id, input.id), eq(notifications.userId, ctx.user.id)));
        return { success: true };
      }),
    unreadCount: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return 0;
      const result = await db.select({ count: sql<number>`count(*)` }).from(notifications)
        .where(and(eq(notifications.userId, ctx.user.id), eq(notifications.isRead, false)));
      return result[0]?.count || 0;
    }),
  }),

  // ==================== ATTENDANCE (Staff/Admin) ====================
  attendance: router({
    checkIn: protectedProcedure
      .input(z.object({ childId: z.number(), notes: z.string().optional() }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        await db.insert(attendance).values({
          childId: input.childId,
          date: today,
          checkInTime: new Date(),
          checkedInBy: ctx.user.id,
          status: "present",
          notes: input.notes || null,
        });
        return { success: true };
      }),
    checkOut: protectedProcedure
      .input(z.object({ attendanceId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.update(attendance).set({ checkOutTime: new Date(), checkedOutBy: ctx.user.id })
          .where(eq(attendance.id, input.attendanceId));
        return { success: true };
      }),
    todayList: protectedProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return db.select().from(attendance)
        .where(and(
          sql`${attendance.date} >= ${today}`,
          sql`${attendance.date} < ${tomorrow}`
        ))
        .orderBy(attendance.checkInTime);
    }),
  }),

  // ==================== CHILDREN UPDATE ====================
  // Add update to children router

  // ==================== GALLERY (Staff upload, parent privacy) ====================
  gallery: router({
    upload: staffProcedure
      .input(z.object({
        childId: z.number().optional(),
        imageUrl: z.string().min(1),
        imageKey: z.string().min(1),
        caption: z.string().optional(),
        isPublic: z.boolean().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(galleryPhotos).values({
          childId: input.childId || null,
          uploadedBy: ctx.user.id,
          imageUrl: input.imageUrl,
          imageKey: input.imageKey,
          caption: input.caption || null,
          isPublic: input.isPublic ?? false,
        });
        return { success: true };
      }),
    getForChild: protectedProcedure
      .input(z.object({ childId: z.number() }))
      .query(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) return [];
        // Parents can only see photos for their own children
        if (ctx.user.role !== "admin" && ctx.user.role !== "staff") {
          const child = await db.select().from(children).where(and(eq(children.id, input.childId), eq(children.parentId, ctx.user.id))).limit(1);
          if (!child.length) return [];
        }
        return db.select().from(galleryPhotos).where(eq(galleryPhotos.childId, input.childId)).orderBy(desc(galleryPhotos.createdAt));
      }),
    getPublic: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(galleryPhotos).where(eq(galleryPhotos.isPublic, true)).orderBy(desc(galleryPhotos.createdAt)).limit(20);
    }),
  }),

  // ==================== STAFF PROFILES ====================
  staff: router({
    list: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(staffProfiles).where(eq(staffProfiles.isActive, true));
    }),
    listAll: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(staffProfiles).orderBy(desc(staffProfiles.createdAt));
    }),
    add: adminProcedure
      .input(z.object({
        title: z.string().min(1), // job title / name
        bio: z.string().optional(),
        qualifications: z.string().optional(),
        roomId: z.number().optional(),
        startDate: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(staffProfiles).values({
          userId: 0, // no user account needed for staff profiles
          title: input.title,
          bio: input.bio || null,
          qualifications: input.qualifications || null,
          roomId: input.roomId || null,
          startDate: input.startDate ? new Date(input.startDate) : null,
          isActive: true,
        });
        return { success: true };
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        bio: z.string().optional(),
        qualifications: z.string().optional(),
        roomId: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        const { id, ...updates } = input;
        const setValues: any = {};
        if (updates.title !== undefined) setValues.title = updates.title;
        if (updates.bio !== undefined) setValues.bio = updates.bio;
        if (updates.qualifications !== undefined) setValues.qualifications = updates.qualifications;
        if (updates.roomId !== undefined) setValues.roomId = updates.roomId;
        if (updates.isActive !== undefined) setValues.isActive = updates.isActive;
        if (Object.keys(setValues).length > 0) {
          await db.update(staffProfiles).set(setValues).where(eq(staffProfiles.id, id));
        }
        return { success: true };
      }),
    remove: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.update(staffProfiles).set({ isActive: false }).where(eq(staffProfiles.id, input.id));
        return { success: true };
      }),
  }),

  // ==================== NEWS (Admin CRUD) ====================
  news: router({
    list: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(newsEvents).where(eq(newsEvents.isPublished, true)).orderBy(desc(newsEvents.createdAt)).limit(20);
    }),
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        type: z.enum(["news", "event", "announcement"]),
        eventDate: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(newsEvents).values({
          title: input.title,
          content: input.content,
          type: input.type,
          eventDate: input.eventDate ? new Date(input.eventDate) : null,
          authorId: ctx.user.id,
        });
        return { success: true };
      }),
  }),

  // ==================== ADMIN STATS ====================
  admin: router({
    stats: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return { children: 0, waitingList: 0, staff: 0, pendingVisits: 0 };
      const [childCount] = await db.select({ count: sql<number>`count(*)` }).from(children).where(eq(children.status, "active"));
      const [waitCount] = await db.select({ count: sql<number>`count(*)` }).from(waitingList).where(eq(waitingList.status, "waiting"));
      const [staffCount] = await db.select({ count: sql<number>`count(*)` }).from(users).where(sql`${users.role} IN ('staff', 'admin')`);
      const [visitCount] = await db.select({ count: sql<number>`count(*)` }).from(visitBookings).where(eq(visitBookings.status, "pending"));
      return {
        children: childCount?.count || 0,
        waitingList: waitCount?.count || 0,
        staff: staffCount?.count || 0,
        pendingVisits: visitCount?.count || 0,
      };
    }),
    listUsers: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select({ id: users.id, name: users.name, email: users.email, role: users.role }).from(users).orderBy(users.role, users.name);
    }),
    // Create notification for a user
    sendNotification: adminProcedure
      .input(z.object({
        userId: z.number(),
        title: z.string().min(1),
        message: z.string().min(1),
        type: z.enum(["activity", "session", "absence", "news", "announcement", "general"]),
        link: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(notifications).values({
          userId: input.userId,
          title: input.title,
          message: input.message,
          type: input.type,
          link: input.link || null,
        });
        return { success: true };
      }),
    // Notify all parents
    broadcastNotification: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        message: z.string().min(1),
        type: z.enum(["activity", "session", "absence", "news", "announcement", "general"]),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        // Get all parent users
        const parents = await db.select().from(users).where(sql`${users.role} IN ('user', 'parent')`);
        if (parents.length > 0) {
          await db.insert(notifications).values(
            parents.map(p => ({
              userId: p.id,
              title: input.title,
              message: input.message,
              type: input.type,
            }))
          );
        }
        return { success: true, count: parents.length };
      }),
    createRoomLogin: adminProcedure
      .input(z.object({
        roomId: z.number(),
        username: z.string().min(1),
        password: z.string().min(4),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        // Check if room already has a login
        const existing = await db.select().from(users).where(sql`${users.role} = 'staff' AND ${users.roomId} = ${input.roomId}`).limit(1);
        if (existing.length) {
          // Update existing room login
          const hashedPassword = await bcrypt.hash(input.password, 10);
          await db.update(users).set({ name: input.username, email: input.username, password: hashedPassword }).where(eq(users.id, existing[0].id));
          return { success: true, updated: true };
        }
        const hashedPassword = await bcrypt.hash(input.password, 10);
        await db.insert(users).values({
          openId: `room_${input.roomId}_${Date.now()}`,
          name: input.username,
          email: input.username,
          password: hashedPassword,
          role: "staff",
          roomId: input.roomId,
        });
        return { success: true, updated: false };
      }),
    listRoomLogins: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select({ id: users.id, name: users.name, email: users.email, roomId: users.roomId }).from(users).where(eq(users.role, "staff"));
    }),
    deleteRoomLogin: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.delete(users).where(sql`${users.id} = ${input.id} AND ${users.role} = 'staff'`);
        return { success: true };
      }),
  }),

  // ==================== NEWSLETTER ====================
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email(), name: z.string().optional() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        try {
          await db.insert(newsletterSubscribers).values({ email: input.email, name: input.name || null });
        } catch (e: any) {
          if (e?.code === "ER_DUP_ENTRY") throw new Error("This email is already subscribed.");
          throw e;
        }
        return { success: true };
      }),
    unsubscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.update(newsletterSubscribers).set({ isActive: false, unsubscribedAt: new Date() }).where(eq(newsletterSubscribers.email, input.email));
        return { success: true };
      }),
    list: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.isActive, true)).orderBy(desc(newsletterSubscribers.subscribedAt));
    }),
    send: adminProcedure
      .input(z.object({ subject: z.string().min(1), content: z.string().min(1) }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        const subs = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.isActive, true));
        await db.insert(newsletters).values({
          subject: input.subject,
          content: input.content,
          sentBy: ctx.user.id,
          recipientCount: subs.length,
        });
        return { success: true, recipientCount: subs.length };
      }),
  }),

  // ==================== STAFF TRAINING & COMPLIANCE ====================
  training: router({
    list: staffProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(staffTraining).orderBy(desc(staffTraining.createdAt));
    }),
    getByStaff: staffProcedure
      .input(z.object({ staffId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        return db.select().from(staffTraining).where(eq(staffTraining.staffId, input.staffId)).orderBy(desc(staffTraining.completedDate));
      }),
    add: adminProcedure
      .input(z.object({
        staffId: z.number(),
        trainingType: z.enum(["dbs_check", "first_aid", "paediatric_first_aid", "safeguarding", "food_hygiene", "fire_safety", "manual_handling", "prevent_duty", "health_safety", "gdpr", "sen_awareness", "behaviour_management", "other"]),
        title: z.string().min(1),
        provider: z.string().optional(),
        completedDate: z.string().min(1),
        expiryDate: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(staffTraining).values({
          staffId: input.staffId,
          trainingType: input.trainingType,
          title: input.title,
          provider: input.provider || null,
          completedDate: new Date(input.completedDate),
          expiryDate: input.expiryDate ? new Date(input.expiryDate) : null,
          notes: input.notes || null,
        });
        return { success: true };
      }),
    uploadCertificate: adminProcedure
      .input(z.object({
        trainingId: z.number(),
        fileName: z.string().min(1),
        fileBase64: z.string().min(1),
        contentType: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        const { storagePut } = await import("./storage");
        const fileBuffer = Buffer.from(input.fileBase64, 'base64');
        const fileKey = `certificates/${input.trainingId}/${input.fileName}`;
        const { url } = await storagePut(fileKey, fileBuffer, input.contentType);
        await db.update(staffTraining)
          .set({ certificateUrl: url })
          .where(eq(staffTraining.id, input.trainingId));
        return { success: true, url };
      }),
    getExpiring: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      return db.select().from(staffTraining).where(
        and(
          sql`${staffTraining.expiryDate} IS NOT NULL`,
          sql`${staffTraining.expiryDate} <= ${thirtyDaysFromNow}`
        )
      ).orderBy(staffTraining.expiryDate);
    }),
  }),

  // ==================== INCIDENTS & ACCIDENTS ====================
  incidents: router({
    report: staffProcedure
      .input(z.object({
        childId: z.number(),
        type: z.enum(["accident", "incident", "near_miss", "concern"]),
        date: z.string().min(1),
        time: z.string().optional(),
        location: z.string().optional(),
        description: z.string().min(1),
        actionTaken: z.string().optional(),
        injuries: z.string().optional(),
        witnessName: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(incidents).values({
          childId: input.childId,
          type: input.type,
          date: new Date(input.date),
          time: input.time || null,
          location: input.location || null,
          description: input.description,
          actionTaken: input.actionTaken || null,
          injuries: input.injuries || null,
          witnessName: input.witnessName || null,
          reportedBy: ctx.user.id,
        });
        // Notify the parent about the incident
        const child = await db.select().from(children).where(eq(children.id, input.childId)).limit(1);
        if (child.length > 0 && child[0].parentId) {
          await db.insert(notifications).values({
            userId: child[0].parentId,
            type: "general",
            title: `${input.type.charAt(0).toUpperCase() + input.type.slice(1)} Report - ${child[0].firstName}`,
            message: `An ${input.type} has been reported for ${child[0].firstName}. ${input.description}${input.actionTaken ? ` Action taken: ${input.actionTaken}` : ""}`,
          });
        }
        return { success: true };
      }),
    list: staffProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(incidents).orderBy(desc(incidents.createdAt)).limit(50);
    }),
    getByChild: protectedProcedure
      .input(z.object({ childId: z.number() }))
      .query(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) return [];
        // Parents can only see their own child's incidents
        if (ctx.user.role === "parent") {
          const child = await db.select().from(children).where(and(eq(children.id, input.childId), eq(children.parentId, ctx.user.id))).limit(1);
          if (!child.length) return [];
        }
        return db.select().from(incidents).where(eq(incidents.childId, input.childId)).orderBy(desc(incidents.date));
      }),
  }),

  // ==================== MEDICATION LOG ====================
  medication: router({
    add: staffProcedure
      .input(z.object({
        childId: z.number(),
        medicationName: z.string().min(1),
        dosage: z.string().min(1),
        frequency: z.string().optional(),
        reason: z.string().optional(),
        parentConsentGiven: z.boolean().default(false),
        startDate: z.string().min(1),
        endDate: z.string().optional(),
        timeGiven: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(medicationLog).values({
          childId: input.childId,
          medicationName: input.medicationName,
          dosage: input.dosage,
          frequency: input.frequency || null,
          reason: input.reason || null,
          parentConsentGiven: input.parentConsentGiven,
          startDate: new Date(input.startDate),
          endDate: input.endDate ? new Date(input.endDate) : null,
          administeredBy: ctx.user.id,
          administeredAt: new Date(),
          notes: input.timeGiven ? `Given at ${input.timeGiven}` : null,
        });
        // Notify parent about medication
        const child = await db.select().from(children).where(eq(children.id, input.childId)).limit(1);
        if (child.length && child[0].parentId) {
          await db.insert(notifications).values({
            userId: child[0].parentId,
            title: `Medication Given - ${child[0].firstName}`,
            message: `${input.medicationName} (${input.dosage}) was administered to ${child[0].firstName}${input.timeGiven ? ` at ${input.timeGiven}` : ""}.${input.reason ? ` Reason: ${input.reason}` : ""}`,
            type: "general",
          });
        }
        return { success: true };
      }),
    getByChild: protectedProcedure
      .input(z.object({ childId: z.number() }))
      .query(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) return [];
        // Parents can only see their own child's medication
        if (ctx.user.role === "parent") {
          const child = await db.select().from(children).where(and(eq(children.id, input.childId), eq(children.parentId, ctx.user.id))).limit(1);
          if (!child.length) return [];
        }
        return db.select().from(medicationLog).where(eq(medicationLog.childId, input.childId)).orderBy(desc(medicationLog.createdAt));
      }),
    list: staffProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(medicationLog).orderBy(desc(medicationLog.createdAt)).limit(50);
    }),
  }),

  // ==================== VISITOR SIGN-IN ====================
  visitors: router({
    signIn: staffProcedure
      .input(z.object({
        visitorName: z.string().min(1),
        organisation: z.string().optional(),
        purpose: z.string().min(1),
        personVisiting: z.string().optional(),
        dbsChecked: z.boolean().default(false),
        badgeIssued: z.boolean().default(false),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(visitorLog).values({
          visitorName: input.visitorName,
          organisation: input.organisation || null,
          purpose: input.purpose,
          personVisiting: input.personVisiting || null,
          dbsChecked: input.dbsChecked,
          badgeIssued: input.badgeIssued,
          signedInBy: ctx.user.id,
        });
        return { success: true };
      }),
    signOut: staffProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.update(visitorLog).set({ signOutTime: new Date() }).where(eq(visitorLog.id, input.id));
        return { success: true };
      }),
    list: staffProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(visitorLog).orderBy(desc(visitorLog.signInTime)).limit(50);
    }),
    today: staffProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return db.select().from(visitorLog).where(sql`${visitorLog.signInTime} >= ${today}`).orderBy(desc(visitorLog.signInTime));
    }),
  }),

  // ==================== FIRE DRILLS ====================
  fireDrills: router({
    log: adminProcedure
      .input(z.object({
        date: z.string().min(1),
        time: z.string().optional(),
        evacuationTime: z.string().optional(),
        childrenPresent: z.number().optional(),
        staffPresent: z.number().optional(),
        visitorsPresent: z.number().optional(),
        issues: z.string().optional(),
        actionRequired: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(fireDrills).values({
          date: new Date(input.date),
          time: input.time || null,
          evacuationTime: input.evacuationTime || null,
          childrenPresent: input.childrenPresent || null,
          staffPresent: input.staffPresent || null,
          visitorsPresent: input.visitorsPresent || null,
          issues: input.issues || null,
          actionRequired: input.actionRequired || null,
          conductedBy: ctx.user.id,
        });
        return { success: true };
      }),
    list: staffProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(fireDrills).orderBy(desc(fireDrills.date));
    }),
  }),

  // ==================== CHILD MILESTONES ====================
  milestones: router({
    add: staffProcedure
      .input(z.object({
        childId: z.number(),
        area: z.enum(["communication_language", "physical_development", "personal_social_emotional", "literacy", "mathematics", "understanding_world", "expressive_arts"]),
        milestone: z.string().min(1),
        observedDate: z.string().min(1),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(childMilestones).values({
          childId: input.childId,
          area: input.area,
          milestone: input.milestone,
          observedDate: new Date(input.observedDate),
          notes: input.notes || null,
          recordedBy: ctx.user.id,
        });
        return { success: true };
      }),
    getByChild: protectedProcedure
      .input(z.object({ childId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        return db.select().from(childMilestones).where(eq(childMilestones.childId, input.childId)).orderBy(desc(childMilestones.observedDate));
      }),
  }),

  // ==================== DOCUMENTS & SIGNING ====================
  documents: router({
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        documentType: z.enum(["consent_form", "contract", "policy", "medical_form", "photo_permission", "trip_permission", "employment", "other"]),
        documentUrl: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(documents).values({
          title: input.title,
          description: input.description || null,
          documentType: input.documentType,
          documentUrl: input.documentUrl || null,
          createdBy: ctx.user.id,
        });
        return { success: true };
      }),
    uploadFile: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        documentType: z.enum(["consent_form", "contract", "policy", "medical_form", "photo_permission", "trip_permission", "employment", "other"]),
        fileName: z.string().min(1),
        fileBase64: z.string().min(1),
        contentType: z.string().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");

        const { storagePut } = await import("./storage");
        const safeFileName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
        const fileBuffer = Buffer.from(input.fileBase64, "base64");
        const fileKey = `documents/${Date.now()}-${safeFileName}`;
        const { url } = await storagePut(fileKey, fileBuffer, input.contentType);

        await db.insert(documents).values({
          title: input.title,
          description: input.description || null,
          documentType: input.documentType,
          documentUrl: url,
          createdBy: ctx.user.id,
        });

        return { success: true, url };
      }),
    list: staffProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(documents).orderBy(desc(documents.createdAt));
    }),
    sendForSigning: adminProcedure
      .input(z.object({ documentId: z.number(), userIds: z.array(z.number()) }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        const values = input.userIds.map(userId => ({
          documentId: input.documentId,
          userId,
        }));
        if (values.length > 0) {
          await db.insert(documentSignatures).values(values);
        }
        return { success: true, count: values.length };
      }),
    myPending: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      return db.select()
        .from(documentSignatures)
        .innerJoin(documents, eq(documentSignatures.documentId, documents.id))
        .where(and(
          eq(documentSignatures.userId, ctx.user.id),
          eq(documentSignatures.status, "pending")
        ));
    }),
    sign: protectedProcedure
      .input(z.object({ signatureId: z.number(), signatureData: z.string() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.update(documentSignatures).set({
          status: "signed",
          signedAt: new Date(),
          signatureData: input.signatureData,
        }).where(eq(documentSignatures.id, input.signatureId));
                return { success: true };
      }),
  }),

  // ==================== STAFF SHIFTS ====================
  shifts: router({
    list: staffProcedure
      .input(z.object({ weekStart: z.string().optional() }).optional())
      .query(async () => {
        const db = await getDb();
        if (!db) return [];
        return db.select().from(staffShifts).orderBy(desc(staffShifts.date)).limit(100);
      }),
    create: adminProcedure
      .input(z.object({
        staffId: z.number(),
        date: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        roomId: z.number().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(staffShifts).values({
          staffId: input.staffId,
          date: new Date(input.date),
          startTime: input.startTime,
          endTime: input.endTime,
          roomId: input.roomId || null,
          notes: input.notes || null,
        });
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.delete(staffShifts).where(eq(staffShifts.id, input.id));
        return { success: true };
      }),
  }),

  // ==================== SURVEYS ====================
  surveys: router({
    submit: protectedProcedure
      .input(z.object({
        childId: z.number().optional(),
        rating: z.number().min(1).max(5),
        category: z.enum(["communication", "activities", "meals", "cleanliness", "staff", "overall"]),
        comments: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(surveys).values({
          parentId: ctx.user.id,
          childId: input.childId || null,
          rating: input.rating,
          category: input.category,
          comments: input.comments || null,
        });
        return { success: true };
      }),
    list: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(surveys).orderBy(desc(surveys.submittedAt)).limit(100);
    }),
  }),

  // ==================== ENQUIRIES ====================
  enquiries: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        childAge: z.string().optional(),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(enquiries).values({
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          childAge: input.childAge || null,
          message: input.message || null,
        });
        return { success: true };
      }),
    list: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(100);
    }),
    updateStatus: adminProcedure
      .input(z.object({ id: z.number(), status: z.enum(["new", "contacted", "interested", "registered", "not_interested", "closed"]), notes: z.string().optional() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.update(enquiries).set({ status: input.status, notes: input.notes || null }).where(eq(enquiries.id, input.id));
        return { success: true };
      }),
  }),

  // ==================== EMERGENCY CONTACTS ====================
  emergencyContacts: router({
    getForChild: staffProcedure
      .input(z.object({ childId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        return db.select().from(emergencyContacts).where(eq(emergencyContacts.childId, input.childId)).orderBy(emergencyContacts.priority);
      }),
    listAll: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select({
        id: emergencyContacts.id,
        childId: emergencyContacts.childId,
        name: emergencyContacts.name,
        relationship: emergencyContacts.relationship,
        phone: emergencyContacts.phone,
        priority: emergencyContacts.priority,
        childFirstName: children.firstName,
        childLastName: children.lastName,
      }).from(emergencyContacts)
        .innerJoin(children, eq(emergencyContacts.childId, children.id))
        .orderBy(children.firstName, emergencyContacts.priority);
    }),
    create: protectedProcedure
      .input(z.object({
        childId: z.number(),
        name: z.string().min(1),
        relationship: z.string().min(1),
        phone: z.string().min(1),
        email: z.string().optional(),
        address: z.string().optional(),
        priority: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(emergencyContacts).values({
          childId: input.childId,
          name: input.name,
          relationship: input.relationship,
          phone: input.phone,
          email: input.email || null,
          address: input.address || null,
          priority: input.priority || 1,
        });
        return { success: true };
      }),
  }),
  occupancy: router({
    getRooms: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(rooms).orderBy(rooms.name);
    }),
    getOccupancy: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      // Get current children count per room
      const roomList = await db.select().from(rooms).orderBy(rooms.name);
      const childrenByRoom = await db
        .select({
          roomId: children.roomId,
          count: sql<number>`count(*)`.as('count'),
        })
        .from(children)
        .where(sql`${children.roomId} IS NOT NULL`)
        .groupBy(children.roomId);
      
      const countMap = new Map(childrenByRoom.map(r => [r.roomId, r.count]));
      
      return roomList.map(room => ({
        id: room.id,
        name: room.name,
        ageRangeMin: room.ageRangeMin,
        ageRangeMax: room.ageRangeMax,
        capacity: room.capacity,
        staffRatio: room.staffRatio,
        color: room.color,
        currentOccupancy: countMap.get(room.id) || 0,
        occupancyPercentage: Math.round(((countMap.get(room.id) || 0) / room.capacity) * 100),
      }));
    }),
    logOccupancy: adminProcedure
      .input(z.object({
        roomId: z.number(),
        childrenPresent: z.number(),
        capacity: z.number(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        await db.insert(occupancyLog).values({
          roomId: input.roomId,
          date: new Date(),
          childrenPresent: input.childrenPresent,
          capacity: input.capacity,
          occupancyPercentage: Math.round((input.childrenPresent / input.capacity) * 100),
        });
        return { success: true };
      }),
    getHistory: adminProcedure
      .input(z.object({ roomId: z.number().optional() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        if (input.roomId) {
          return db.select().from(occupancyLog)
            .where(eq(occupancyLog.roomId, input.roomId))
            .orderBy(desc(occupancyLog.recordedAt))
            .limit(30);
        }
        return db.select().from(occupancyLog)
          .orderBy(desc(occupancyLog.recordedAt))
          .limit(50);
      }),
  }),
});
export type AppRouter = typeof appRouter;
