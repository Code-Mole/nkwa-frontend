import { ShieldAlert, Eye } from "lucide-react";
import EmptyState from "../shared/EmptyState";
import { SERVICES_BY_ID } from "../../data/constants";
import { formatElapsed } from "../../utils/time";
import { useDashboard } from "../../context/DashboardContext";

/**
 * PrankQueue — "Prank call queue: separate de-prioritised list,
 * reviewable by dispatcher" per the role doc. Deliberately not a
 * delete/discard action — the spec calls out "reviewable... not
 * deleted", since false positives in prank detection need a human
 * override path.
 */
export default function PrankQueue() {
  const { prankCalls, selectedCallId, selectCall } = useDashboard();
  const sorted = [...prankCalls].sort((a, b) => b.receivedAt - a.receivedAt);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-severity-prank" />
          <h2 className="font-bold text-ink-900 text-sm">Prank queue</h2>
        </div>
        <span className="text-xs font-semibold text-severity-prank bg-severity-prankBg px-2.5 py-1 rounded-full">
          {sorted.length} flagged
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
        {sorted.length === 0 ? (
          <EmptyState
            icon={ShieldAlert}
            title="No prank calls flagged"
            description="AI-flagged hoax calls will be de-prioritised here instead of reaching a dispatcher."
          />
        ) : (
          sorted.map((call) => {
            const service = SERVICES_BY_ID[call.service];
            const selected = call.id === selectedCallId;
            return (
              <button
                key={call.id}
                type="button"
                onClick={() => selectCall(call.id)}
                className={[
                  "w-full text-left p-3 rounded-xl border flex items-center gap-3 transition-colors",
                  selected
                    ? "border-nkwa-500 bg-nkwa-50"
                    : "border-transparent bg-surface-card hover:border-nkwa-100",
                ].join(" ")}
              >
                <div className="w-8 h-8 rounded-lg bg-severity-prankBg text-severity-prank flex items-center justify-center flex-shrink-0">
                  {service?.icon && (
                    <service.icon className="w-4 h-4" strokeWidth={2} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink-700 truncate">
                    {call.callerNumber}
                  </p>
                  <p className="text-xs text-ink-400">
                    {formatElapsed(call.receivedAt)}
                  </p>
                </div>
                <Eye className="w-4 h-4 text-ink-300 flex-shrink-0" />
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
