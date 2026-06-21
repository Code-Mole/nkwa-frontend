import { createContext, useContext, useState, useCallback } from "react";

/**
 * UserAuthContext — sign-up/sign-in for regular citizens using the
 * personal dashboard (profile + emergency contacts). This is a
 * deliberately separate system from AuthContext.jsx, which gates the
 * *dispatcher* dashboard:
 *
 *   AuthContext      -> dispatcher login (password only, staff-issued)
 *   UserAuthContext   -> citizen sign-up/sign-in (name, email, password)
 *
 * They're kept apart because they really are different things with
 * different data shapes and different backends in a real deployment —
 * collapsing them into one context would make the eventual real-auth
 * migration messier, not simpler.
 *
 * MOCK AUTH — there is no backend yet. Accounts are stored in this
 * context's in-memory state only (a plain useState "users table" plus
 * a "current session" pointer). Refreshing the page logs everyone out
 * and forgets every account that was signed up during the session.
 * Passwords are compared in plaintext in memory — never do this with
 * real credentials; this exists purely to demonstrate the sign-up/
 * sign-in flow and gate the personal dashboard.
 *
 * Admin access: one hardcoded demo account
 * (admin@nkwa.gov.gh / nkwa-admin-2026) is seeded as `isAdmin: true`.
 * Admins see a "Dispatcher Dashboard" link in their profile dropdown
 * that takes them to /dashboard — which still requires going through
 * the separate dispatcher login gate (AuthContext), exactly as before.
 * This account is for demoing that an admin *sees* the link; it does
 * not bypass the dispatcher login itself.
 *
 * BACKEND TODO: replace signUp()/signIn() with real requests, e.g.:
 *   POST /auth/signup { name, email, password } -> { token, user }
 *   POST /auth/signin { email, password } -> { token, user }
 * Store the returned token in an httpOnly cookie set by the backend
 * (not localStorage) and attach it to any REST/WebSocket calls the
 * personal dashboard makes (e.g. saving contacts). The `isAdmin` flag
 * should come from the backend's user record, not be guessed
 * client-side as it is here.
 */

const DEMO_ADMIN = {
  id: "user-admin-demo",
  name: "Demo Admin",
  email: "admin@nkwa.gov.gh",
  password: "nkwa-admin-2026", // demo-only, plaintext, never do this for real
  isAdmin: true,
  region: "Greater Accra",
  homeAddress: "",
  createdAt: Date.now(),
};

const UserAuthContext = createContext(null);

export function UserAuthProvider({ children }) {
  // In-memory "users table" seeded with the demo admin account so the
  // admin-link-in-dropdown flow is demonstrable without signing up
  // first. Anyone can also sign up fresh during the session.
  const [users, setUsers] = useState([DEMO_ADMIN]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [error, setError] = useState(null);

  const currentUser = users.find((u) => u.id === currentUserId) ?? null;

  const signUp = useCallback(
    ({ name, email, password }) => {
      setError(null);
      const normalizedEmail = email?.trim().toLowerCase();

      if (!name?.trim() || !normalizedEmail || !password) {
        setError("Please fill in your name, email, and password.");
        return false;
      }
      if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
        setError(
          "An account with that email already exists. Try signing in instead.",
        );
        return false;
      }

      const newUser = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: normalizedEmail,
        password,
        isAdmin: false,
        region: "",
        homeAddress: "",
        createdAt: Date.now(),
      };
      setUsers((prev) => [...prev, newUser]);
      setCurrentUserId(newUser.id);
      return true;
    },
    [users],
  );

  const signIn = useCallback(
    ({ email, password }) => {
      setError(null);
      const normalizedEmail = email?.trim().toLowerCase();
      const match = users.find(
        (u) => u.email.toLowerCase() === normalizedEmail,
      );

      if (!match || match.password !== password) {
        setError("Incorrect email or password.");
        return false;
      }
      setCurrentUserId(match.id);
      return true;
    },
    [users],
  );

  const signOut = useCallback(() => {
    setCurrentUserId(null);
  }, []);

  const updateProfile = useCallback(
    (patch) => {
      if (!currentUserId) return;
      setUsers((prev) =>
        prev.map((u) => (u.id === currentUserId ? { ...u, ...patch } : u)),
      );
    },
    [currentUserId],
  );

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    error,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const ctx = useContext(UserAuthContext);
  if (!ctx) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return ctx;
}
