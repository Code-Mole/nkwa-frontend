import { createContext, useContext, useState, useCallback } from "react";

/**
 * AuthContext — gates the dispatcher dashboard behind a login screen.
 * Regular users (the caller web app at /call) never touch this; it
 * exists purely so dispatcher-facing data (caller numbers, locations,
 * AI briefs) isn't sitting open behind a guessable URL.
 *
 * MOCK AUTH — this is intentionally fake. There is no backend yet, so
 * this checks a hardcoded demo password and keeps the "session" in
 * memory only (a plain useState, not even localStorage — refreshing
 * the page logs you out). This is a stand-in to demonstrate the gate,
 * not a security boundary. Treat any data rendered behind it as
 * demo-only until real auth is wired in.
 *
 * BACKEND TODO: replace `login()` below with a real request, e.g.:
 *   POST /auth/login { email, password } -> { token, dispatcher }
 * Store the returned token (ideally in an httpOnly cookie set by the
 * backend, not localStorage) and attach it to the WebSocket connection
 * and any REST calls the dashboard makes. Until then, swapping this
 * mock for real auth should only require changing the body of
 * `login()` — every component below reads `isAuthenticated` /
 * `dispatcher` from this context, not from the login mechanism itself.
 */

// Demo-only credential. Never treat this as a real secret — it ships
// in the client bundle and is visible to anyone who opens devtools.
const DEMO_PASSWORD = "nkwa-demo-2026";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [dispatcher, setDispatcher] = useState(null);
  const [error, setError] = useState(null);

  const login = useCallback((name, password) => {
    setError(null);
    if (password !== DEMO_PASSWORD) {
      setError("Incorrect password. Ask your team lead for the demo password.");
      return false;
    }
    setDispatcher({
      name: name?.trim() || "Dispatcher",
      loggedInAt: Date.now(),
    });
    return true;
  }, []);

  const logout = useCallback(() => {
    setDispatcher(null);
  }, []);

  const value = {
    dispatcher,
    isAuthenticated: !!dispatcher,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
