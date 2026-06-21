import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Eye, User, Mail, Lock, AlertCircle } from "lucide-react";
import Button from "../components/shared/Button";
import { useUserAuth } from "../context/UserAuthContext";

/**
 * SignUp — citizen account creation. Styled after the mobile app's
 * "Create your account / Join Nkwa — stay safe, stay connected" screen
 * (purple gradient header card, rounded input fields with leading
 * icons, full-width gradient button, "Already have an account?" link).
 */
export default function SignUp() {
  const { signUp, error } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectTo = location.state?.from?.pathname ?? "/my/profile";

  function handleSubmit(e) {
    e.preventDefault();
    const success = signUp({ name, email, password });
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
          <h1 className="relative z-10 text-white text-xl font-bold">
            Create your account
          </h1>
          <p className="relative z-10 text-white/70 text-sm mt-1">
            Join Nkwa — stay safe, stay connected.
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
              htmlFor="signup-name"
              className="block text-sm font-medium text-ink-700 mb-1.5"
            >
              Full name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ama Boateng"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-nkwa-50 border border-transparent focus:border-nkwa-300 focus:bg-white outline-none text-sm transition-colors"
                autoComplete="name"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="block text-sm font-medium text-ink-700 mb-1.5"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-nkwa-50 border border-transparent focus:border-nkwa-300 focus:bg-white outline-none text-sm transition-colors"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="block text-sm font-medium text-ink-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-nkwa-50 border border-transparent focus:border-nkwa-300 focus:bg-white outline-none text-sm transition-colors"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth>
            Create account
          </Button>

          <p className="text-sm text-ink-500 text-center pt-1">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-nkwa-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
