import { useCallback, useMemo, useState } from "react";

type Role = "admin" | "staff" | "parent";

type AuthUser = {
  id: number;
  username: string;
  role: Role;
  email?: string;
};

const AUTH_KEY = "little_ava_auth";

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());

  const login = useCallback(async (
    credentialsOrUsername: string | { username?: string; password?: string },
    maybePassword?: string,
  ) => {
    const username =
      typeof credentialsOrUsername === "string"
        ? credentialsOrUsername
        : credentialsOrUsername?.username || "";
    const password =
      typeof credentialsOrUsername === "string"
        ? maybePassword || ""
        : credentialsOrUsername?.password || "";

    if (username !== "admin" || password !== "password") {
      throw new Error("Invalid username or password");
    }

    const nextUser: AuthUser = {
      id: 1,
      username: "admin",
      role: "admin",
      email: "admin@littleavanursery.co.uk",
    };

    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_KEY, JSON.stringify(nextUser));
    }

    setUser(nextUser);
    return nextUser;
  }, []);

  const logout = useCallback(async () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_KEY);
    }
    setUser(null);
  }, []);

  return useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loading: false,
      error: null as Error | null,
      login,
      logout,
    }),
    [user, login, logout],
  );
}

export default useAuth;