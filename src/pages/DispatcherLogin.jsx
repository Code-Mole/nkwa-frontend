import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, Lock, User, AlertCircle, ShieldCheck } from "lucide-react";
import Button from "../components/shared/Button";
import { useAuth } from "../context/AuthContext";

/**
 * DispatcherLogin — gate in front of the dispatcher dashboard. Styled
 * after the mobile app's "Welcome back" / "Sign in" screen (purple
 * gradient header card, rounded input fields, full-width gradient
 * button) so the web app's restricted area still feels like the same
 * product, not a bolted-on admin panel.
 *
 * This is a MOCK login — see context/AuthContext.jsx for details on
 * what's fake here and what the real backend wiring should look like.
 */
export default function DispatcherLogin() {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const redirectTo = location.state?.from?.pathname ?? "/dashboard";

  function handleSubmit(e) {
    e.preventDefault();
    const success = login(name, password);
    if (success) {
      navigate(redirectTo, { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="max-w-sm w-full">
        <div className="bg-nkwa-gradient rounded-t-3xl px-6 pt-8 pb-10 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border border-white/15" />
          <div className="relative z-10 flex items-center gap-2 mb-6">
            <Eye className="w-6 h-6 text-white" strokeWidth={2.5} />
            <span className="text-white text-xl font-bold">nkwa</span>
          </div>
          <div className="relative z-10 flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-white/80" />
            <h1 className="text-white text-xl font-bold">Dispatcher sign in</h1>
          </div>
          <p className="relative z-10 text-white/70 text-sm">
            Restricted to Ghana 112 dispatch staff.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-b-3xl shadow-card-lg px-6 pt-6 pb-7 space-y-4"
        >
          {error && (
            <div className="flex items-start gap-2 px-3.5 py-3 rounded-xl bg-severity-criticalBg text-severity-critical text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="dispatcher-name"
              className="block text-sm font-medium text-ink-700 mb-1.5"
            >
              Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="dispatcher-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ama Boateng"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-nkwa-50 border border-transparent focus:border-nkwa-300 focus:bg-white outline-none text-sm transition-colors"
                autoComplete="name"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="dispatcher-password"
              className="block text-sm font-medium text-ink-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="dispatcher-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter dispatch password"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-nkwa-50 border border-transparent focus:border-nkwa-300 focus:bg-white outline-none text-sm transition-colors"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth>
            Sign in
          </Button>

          <p className="text-xs text-ink-400 text-center pt-1">
            Demo build — ask your team lead for the current password.
          </p>
        </form>
      </div>
    </div>
  );
}
