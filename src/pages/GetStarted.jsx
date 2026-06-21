import { Link } from "react-router-dom";
import {
  PhoneCall,
  ShieldCheck,
  Eye,
  ArrowLeft,
  ChevronRight,
  UserCircle,
} from "lucide-react";

/**
 * GetStarted — the "choose your path" screen between the landing page
 * and the real surfaces of the product. Reached via the landing page's
 * single "Get Started" call to action.
 *
 *   - "I need emergency help" -> /call, open to anyone, no login
 *   - "My account"            -> /sign-in, citizen profile + emergency contacts
 *   - "I'm a dispatcher"      -> /dispatcher-login, gated, staff only
 *
 * Kept as its own route (rather than folded into the landing page)
 * because it's a decision point, not marketing content — it should be
 * reachable directly too, e.g. linked from elsewhere without dragging
 * the whole pitch along with it.
 */
export default function GetStarted() {
  return (
    <div className="min-h-screen bg-nkwa-gradient flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full border border-white/15" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border border-white/10" />

      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors z-10"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="max-w-md w-full relative z-10">
        <div className="flex items-center gap-2 justify-center mb-3">
          <Eye className="w-7 h-7 text-white" strokeWidth={2.5} />
          <span className="text-white text-3xl font-bold">nkwa</span>
        </div>
        <p className="text-white/70 text-center text-sm mb-8">
          How would you like to continue?
        </p>

        <div className="bg-white rounded-3xl shadow-card-lg p-3 space-y-3">
          <Link
            to="/call"
            className="flex items-center gap-4 p-4 rounded-2xl border border-nkwa-100 hover:border-nkwa-300 hover:bg-nkwa-50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-2xl bg-service-ambulanceBg text-service-ambulance flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-5 h-5" strokeWidth={2.25} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-ink-900">
                I need emergency help
              </p>
              <p className="text-sm text-ink-500">
                Place a 112 call — no account needed
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-ink-300 group-hover:text-nkwa-500 flex-shrink-0" />
          </Link>

          <Link
            to="/sign-in"
            className="flex items-center gap-4 p-4 rounded-2xl border border-nkwa-100 hover:border-nkwa-300 hover:bg-nkwa-50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-2xl bg-nkwa-50 text-nkwa-600 flex items-center justify-center flex-shrink-0">
              <UserCircle className="w-5 h-5" strokeWidth={2.25} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-ink-900">My account</p>
              <p className="text-sm text-ink-500">
                Manage your profile and emergency contacts
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-ink-300 group-hover:text-nkwa-500 flex-shrink-0" />
          </Link>

          <Link
            to="/dispatcher-login"
            className="flex items-center gap-4 p-4 rounded-2xl border border-nkwa-100 hover:border-nkwa-300 hover:bg-nkwa-50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-2xl bg-service-policeBg text-service-police flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" strokeWidth={2.25} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-ink-900">I'm a dispatcher</p>
              <p className="text-sm text-ink-500">
                Sign in to the dispatch dashboard
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-ink-300 group-hover:text-nkwa-500 flex-shrink-0" />
          </Link>
        </div>

        <p className="text-white/50 text-xs text-center mt-6">
          Ghana Fire Service · Ambulance Service · Police Service
        </p>
      </div>
    </div>
  );
}
