import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { MOCK_CALLS } from "../data/mockCalls";

/**
 * DashboardContext — holds the dispatcher dashboard's call list and the
 * currently-selected call, shared across the live feed, map, brief
 * panel, first-aid panel, prank queue, and timeline.
 *
 * BACKEND TODO: `calls` should ultimately be populated and kept in sync
 * by a real WebSocket connection (per the role doc: "React dispatcher
 * dashboard connected via WebSocket"). `applyWebSocketMessage` below
 * already speaks the message contract documented in
 * data/websocketContract.js, so wiring in a real socket is meant to be
 * a drop-in replacement for useSimulatedWebSocket.js:
 *
 *   const ws = new WebSocket(WEBSOCKET_URL);
 *   ws.onmessage = (event) => applyWebSocketMessage(JSON.parse(event.data));
 *
 * No component below needs to change when that swap happens — they all
 * consume `calls` / `selectedCall` from this context, not the socket
 * directly.
 */
const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [calls, setCalls] = useState(MOCK_CALLS);
  const [selectedCallId, setSelectedCallId] = useState(
    MOCK_CALLS[0]?.id ?? null,
  );
  const [toast, setToast] = useState(null);
  const toastTimeoutRef = useRef(null);

  const addCall = useCallback((call) => {
    setCalls((prev) => [call, ...prev]);
  }, []);

  const updateCall = useCallback((callId, patch) => {
    setCalls((prev) =>
      prev.map((c) =>
        c.id === callId
          ? { ...c, ...patch, brief: { ...c.brief, ...(patch.brief || {}) } }
          : c,
      ),
    );
  }, []);

  const showToast = useCallback((toastData) => {
    clearTimeout(toastTimeoutRef.current);
    setToast(toastData);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 6000);
  }, []);

  const dismissToast = useCallback(() => {
    clearTimeout(toastTimeoutRef.current);
    setToast(null);
  }, []);

  /**
   * applyWebSocketMessage — the single entry point for every event
   * shape documented in data/websocketContract.js. Both
   * useSimulatedWebSocket.js (mock) and a future real WebSocket
   * connection should call this and nothing else.
   */
  const applyWebSocketMessage = useCallback(
    (message) => {
      const { type, callId, payload } = message;

      switch (type) {
        case "call_created": {
          setCalls((prev) => [payload, ...prev]);
          // SNS-style alert per the AWS Services table ("Amazon SNS —
          // Critical call alerts"). Only surfaced for CRITICAL severity
          // so the dispatcher isn't interrupted for routine calls.
          if (payload.severity === "CRITICAL") {
            showToast({
              id: payload.id,
              title: "Critical call incoming",
              description: payload.brief?.incidentType ?? "New critical call",
            });
          }
          break;
        }

        case "triage_update": {
          setCalls((prev) =>
            prev.map((c) =>
              c.id === callId
                ? {
                    ...c,
                    severity: payload.severity ?? c.severity,
                    brief: { ...c.brief, ...payload.brief },
                  }
                : c,
            ),
          );
          if (payload.severity === "CRITICAL") {
            showToast({
              id: callId,
              title: "Call upgraded to Critical",
              description: payload.brief?.incidentType ?? "",
            });
          }
          break;
        }

        case "location_resolved": {
          setCalls((prev) =>
            prev.map((c) =>
              c.id === callId
                ? { ...c, location: { ...c.location, ...payload.location } }
                : c,
            ),
          );
          break;
        }

        case "first_aid_step": {
          setCalls((prev) =>
            prev.map((c) =>
              c.id === callId
                ? { ...c, firstAid: { ...c.firstAid, ...payload.firstAid } }
                : c,
            ),
          );
          break;
        }

        case "timeline_event": {
          setCalls((prev) =>
            prev.map((c) =>
              c.id === callId
                ? { ...c, timeline: [...c.timeline, payload.event] }
                : c,
            ),
          );
          break;
        }

        case "call_resolved": {
          setCalls((prev) =>
            prev.map((c) =>
              c.id === callId ? { ...c, status: payload.status } : c,
            ),
          );
          break;
        }

        default:
          // Unknown message type — ignore rather than throw, so a
          // backend schema change doesn't crash the whole dashboard.
          break;
      }
    },
    [showToast],
  );

  const selectCall = useCallback((callId) => {
    setSelectedCallId(callId);
  }, []);

  const activeCalls = useMemo(
    () => calls.filter((c) => !c.isPrank && c.status === "active"),
    [calls],
  );
  const prankCalls = useMemo(() => calls.filter((c) => c.isPrank), [calls]);
  const resolvedCalls = useMemo(
    () => calls.filter((c) => !c.isPrank && c.status === "resolved"),
    [calls],
  );

  const selectedCall = useMemo(
    () => calls.find((c) => c.id === selectedCallId) ?? null,
    [calls, selectedCallId],
  );

  const value = {
    calls,
    activeCalls,
    prankCalls,
    resolvedCalls,
    selectedCall,
    selectedCallId,
    selectCall,
    addCall,
    updateCall,
    applyWebSocketMessage,
    toast,
    dismissToast,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return ctx;
}
