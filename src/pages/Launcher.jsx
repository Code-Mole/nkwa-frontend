import { Link } from 'react-router-dom';
import { PhoneCall, LayoutDashboard, Eye } from 'lucide-react';

/**
 * Internal dev/demo launcher — not part of the product surface. Lets you
 * (or judges) jump straight to either the caller web app or the
 * dispatcher dashboard without typing a URL.
 */
export default function Launcher() {
  return (
    <div className="min-h-screen bg-nkwa-gradient flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Eye className="w-7 h-7 text-white" strokeWidth={2.5} />
          <span className="text-white text-3xl font-bold">nkwa</span>
        </div>

        <div className="bg-white rounded-3xl shadow-card-lg p-6 space-y-4">
          <p className="text-ink-500 text-sm text-center mb-2">
            Choose a surface to open
          </p>

          <Link
            to="/call"
            className="flex items-center gap-4 p-4 rounded-2xl border border-nkwa-100 hover:border-nkwa-300 hover:bg-nkwa-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-service-ambulanceBg text-service-ambulance flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-5 h-5" strokeWidth={2.25} />
            </div>
            <div>
              <p className="font-semibold text-ink-900">Caller web app</p>
              <p className="text-sm text-ink-500">Place a 112 call from a phone browser</p>
            </div>
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-4 p-4 rounded-2xl border border-nkwa-100 hover:border-nkwa-300 hover:bg-nkwa-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-service-policeBg text-service-police flex items-center justify-center flex-shrink-0">
              <LayoutDashboard className="w-5 h-5" strokeWidth={2.25} />
            </div>
            <div>
              <p className="font-semibold text-ink-900">Dispatcher dashboard</p>
              <p className="text-sm text-ink-500">Live call feed, triage briefs, map</p>
            </div>
          </Link>
        </div>

        <p className="text-white/50 text-xs text-center mt-6">
          Internal dev screen — not shown to end users or judges' demo flow
        </p>
      </div>
    </div>
  );
}
