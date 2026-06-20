import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Launcher from "./pages/Launcher.jsx";
import CallerApp from "./pages/CallerApp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DispatcherLogin from "./pages/DispatcherLogin.jsx";
import RequireAuth from "./components/shared/RequireAuth.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

/**
 * Top-level route map.
 *
 * "/"                  — public landing page. Open to anyone.
 * "/call"               — the caller-facing web app (phone browser). Open to anyone, no login.
 * "/dispatcher-login"   — mock sign-in gate for dispatch staff. See context/AuthContext.jsx.
 * "/dashboard"          — the dispatcher dashboard. Requires a signed-in session via RequireAuth.
 * "/dev"                — internal dev/demo screen for jumping between surfaces. Not linked
 *                          from the product itself; convenience only, not auth-gated since it
 *                          exposes no caller or dispatcher data on its own.
 *
 * AuthProvider wraps everything so any page can check auth state, but
 * only /dashboard actually enforces it.
 */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/call/*" element={<CallerApp />} />
          <Route path="/dispatcher-login" element={<DispatcherLogin />} />
          <Route
            path="/dashboard/*"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/dev" element={<Launcher />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
