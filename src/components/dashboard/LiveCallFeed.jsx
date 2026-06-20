import { PhoneIncoming } from "lucide-react";
import LiveCallRow from "./LiveCallRow";
import EmptyState from "../shared/EmptyState";
import { useDashboard } from "../../context/DashboardContext";

/**
 * LiveCallFeed — the scrollable list of incoming/active (non-prank)
 * calls. Sorted newest-first so the most recent call is always visible
 * at the top without the dispatcher needing to scroll.
 */
export default function LiveCallFeed() {
  const { activeCalls, selectedCallId, selectCall } = useDashboard();

  const sorted = [...activeCalls].sort((a, b) => b.receivedAt - a.receivedAt);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <h2 className="font-bold text-ink-900">Live calls</h2>
        <span className="text-xs font-semibold text-nkwa-600 bg-nkwa-50 px-2.5 py-1 rounded-full">
          {sorted.length} active
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2.5">
        {sorted.length === 0 ? (
          <EmptyState
            icon={PhoneIncoming}
            title="No active calls"
            description="New calls will appear here the moment they're triaged."
          />
        ) : (
          sorted.map((call) => (
            <LiveCallRow
              key={call.id}
              call={call}
              selected={call.id === selectedCallId}
              onClick={() => selectCall(call.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
