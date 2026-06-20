import { AlertTriangle, X } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

/**
 * CriticalCallToast — surfaces a brief, dismissible alert when a
 * CRITICAL call arrives or a call is upgraded to CRITICAL. Visually
 * stands in for the real-world push notification Amazon SNS would
 * trigger (see AWS Services table: "Amazon SNS — Critical call
 * alerts"); this component is the in-app echo of that alert, not a
 * replacement for it.
 *
 * BACKEND TODO: a real SNS-driven alert would likely also push a
 * browser/desktop notification or sound. Hook that in here once
 * defined — this component already receives every CRITICAL event via
 * DashboardContext's `toast` state, so it's the natural place to add
 * `new Notification(...)` or an audio cue later.
 */
export default function CriticalCallToast() {
  const { toast, dismissToast, selectCall } = useDashboard();

  if (!toast) return null;

  return (
    <div className="fixed top-5 right-5 z-50 w-80 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-card-lg border border-severity-critical/20 p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-severity-criticalBg text-severity-critical flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-4.5 h-4.5" strokeWidth={2.25} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-ink-900 text-sm">{toast.title}</p>
          {toast.description && (
            <p className="text-xs text-ink-500 mt-0.5 truncate">
              {toast.description}
            </p>
          )}
          <button
            type="button"
            onClick={() => {
              selectCall(toast.id);
              dismissToast();
            }}
            className="text-xs font-semibold text-severity-critical mt-2 hover:underline"
          >
            View call
          </button>
        </div>
        <button
          type="button"
          onClick={dismissToast}
          aria-label="Dismiss"
          className="text-ink-300 hover:text-ink-500 flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
