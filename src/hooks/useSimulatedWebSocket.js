import { useEffect, useRef } from "react";
import { useDashboard } from "../context/DashboardContext";
import { buildMockCallSequence } from "../data/mockWebSocketEvents";

/**
 * useSimulatedWebSocket — stands in for a real WebSocket connection.
 * Periodically kicks off a new mock call and feeds its staged event
 * sequence (call_created -> triage_update -> location_resolved ->
 * first_aid_step -> ...) into applyWebSocketMessage on realistic
 * delays, so the dashboard's brief/map/first-aid panels visibly
 * populate over time instead of appearing instantly — this is what the
 * role doc means by "the brief populates visibly during the demo".
 *
 * BACKEND TODO: delete this hook (and mockWebSocketEvents.js,
 * websocketContract.js's mock-specific parts) once a real WebSocket is
 * connected. Replace with:
 *
 *   useEffect(() => {
 *     const ws = new WebSocket(WEBSOCKET_URL);
 *     ws.onmessage = (e) => applyWebSocketMessage(JSON.parse(e.data));
 *     return () => ws.close();
 *   }, [applyWebSocketMessage]);
 *
 * No other component needs to change — they all read from
 * DashboardContext, not from this hook directly.
 *
 * @param {boolean} enabled - turn the simulation on/off
 * @param {number} intervalMs - time between new simulated calls starting
 */
export function useSimulatedWebSocket(enabled = true, intervalMs = 30000) {
  const { applyWebSocketMessage } = useDashboard();
  const timeoutsRef = useRef([]);

  useEffect(() => {
    if (!enabled) return undefined;

    function runSequence() {
      const sequence = buildMockCallSequence();
      sequence.forEach(({ delayMs, message }) => {
        const t = setTimeout(() => applyWebSocketMessage(message), delayMs);
        timeoutsRef.current.push(t);
      });
    }

    function scheduleNext() {
      const jitter = intervalMs * 0.3 * (Math.random() - 0.5);
      const t = setTimeout(() => {
        runSequence();
        scheduleNext();
      }, intervalMs + jitter);
      timeoutsRef.current.push(t);
    }

    // Kick off the first sequence quickly so the demo shows motion
    // within a few seconds of the dashboard loading, then continue on
    // the regular interval.
    const firstRun = setTimeout(runSequence, 4000);
    timeoutsRef.current.push(firstRun);
    scheduleNext();

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [enabled, intervalMs, applyWebSocketMessage]);
}
