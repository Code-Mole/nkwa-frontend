import { useEffect, useRef } from "react";
import { useDashboard } from "../context/DashboardContext";
import { buildIncomingCall } from "../data/mockCalls";

/**
 * useSimulatedCallFeed — periodically injects a new mock call into the
 * dashboard so the "Live call feed" demonstrates motion during the
 * hackathon demo without a real backend connected yet.
 *
 * BACKEND TODO: delete this hook entirely once the real WebSocket
 * connection is wired up in DashboardContext — this exists purely to
 * fill the gap until then. It is intentionally isolated here (rather
 * than mixed into DashboardContext) so removing it later is a one-line
 * change in Dashboard.jsx.
 *
 * @param {boolean} enabled - turn the simulation on/off (e.g. wire to a
 *   dev-only toggle so it doesn't run by accident once real data exists)
 * @param {number} intervalMs - time between simulated new calls
 */
export function useSimulatedCallFeed(enabled = true, intervalMs = 25000) {
  const { addCall } = useDashboard();
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    function scheduleNext() {
      const jitter = intervalMs * 0.4 * (Math.random() - 0.5);
      timeoutRef.current = setTimeout(() => {
        const services = ["ambulance", "fire", "police", "sos"];
        const severities = ["CRITICAL", "URGENT", "NON_EMERGENCY"];
        const service = services[Math.floor(Math.random() * services.length)];
        const severity =
          severities[Math.floor(Math.random() * severities.length)];

        addCall(
          buildIncomingCall({
            service,
            severity,
            brief: {
              incidentType: "Triage in progress…",
              severity,
              recommendedUnit: null,
              confidence: null,
              summary: "Brief is being generated from the live call.",
            },
          }),
        );

        scheduleNext();
      }, intervalMs + jitter);
    }

    scheduleNext();
    return () => clearTimeout(timeoutRef.current);
  }, [enabled, intervalMs, addCall]);
}
