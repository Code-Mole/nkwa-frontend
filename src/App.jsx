import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import GetStarted from "./pages/GetStarted.jsx";
import Launcher from "./pages/Launcher.jsx";
import CallerApp from "./pages/CallerApp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DispatcherLogin from "./pages/DispatcherLogin.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ContactsPage from "./pages/ContactsPage.jsx";
import RequireAuth from "./components/shared/RequireAuth.jsx";
import RequireUserAuth from "./components/shared/RequireUserAuth.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UserAuthProvider } from "./context/UserAuthContext.jsx";
import { EmergencyContactsProvider } from "./context/EmergencyContactsContext.jsx";

/**
 * Top-level route map.
 *
 * "/"                  — public landing page. Open to anyone.
 * "/get-started"        — "choose your path" screen reached from the landing page's CTA.
 * "/call"               — the caller-facing web app (phone browser). Open to anyone, no login.
 *
 * Citizen account (personal dashboard) — see context/UserAuthContext.jsx:
 * "/sign-up"             — citizen account creation.
 * "/sign-in"              — citizen sign-in.
 * "/my/profile"           — personal dashboard, Profile tab. Requires RequireUserAuth.
 * "/my/contacts"          — personal dashboard, Emergency contacts tab. Requires RequireUserAuth.
 *
 * Dispatcher dashboard — unchanged, kept as a fully separate system per
 * the decision to keep both login paths:
 * "/dispatcher-login"   — mock sign-in gate for dispatch staff. See context/AuthContext.jsx.
 * "/dashboard"          — the dispatcher dashboard. Requires a signed-in session via RequireAuth.
 *   Admin citizen accounts (currentUser.isAdmin) see a link to this page in their
 *   profile dropdown, but still have to pass through /dispatcher-login to actually
 *   get in — being an admin only reveals the link, it doesn't bypass the gate.
 *
 * "/dev"                — internal dev/demo screen for jumping between surfaces. Not linked
 *                          from the product itself; convenience only, not auth-gated since it
 *                          exposes no caller or dispatcher data on its own.
 *
 * Two independent auth systems are both wrapped around the whole app so
 * any page can check either one: AuthProvider (dispatcher) and
 * UserAuthProvider (citizen). EmergencyContactsProvider depends on
 * UserAuthProvider (it keys contacts by the signed-in citizen's id), so
 * it's nested inside it.
 */
export default function App() {
  return (
    <AuthProvider>
      <UserAuthProvider>
        <EmergencyContactsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/call/*" element={<CallerApp />} />

              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route
                path="/my/profile"
                element={
                  <RequireUserAuth>
                    <ProfilePage />
                  </RequireUserAuth>
                }
              />
              <Route
                path="/my/contacts"
                element={
                  <RequireUserAuth>
                    <ContactsPage />
                  </RequireUserAuth>
                }
              />

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
        </EmergencyContactsProvider>
      </UserAuthProvider>
    </AuthProvider>
  );
}
