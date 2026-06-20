import { WEBSOCKET_MESSAGE_TYPES } from "./websocketContract";

/**
 * buildMockCallSequence — generates a realistic, staged sequence of
 * WebSocket-shaped events for ONE incoming call, spread out over real
 * time (delays in ms). This is what makes the dashboard demo actually
 * show the brief "populating visibly" per the role doc's demo-priority
 * note, instead of a call just appearing fully-formed.
 *
 * Sequence mirrors the "How it works!" flow from the idea submission:
 *   caller speaks -> Nkwa listens -> AI triages -> locates caller ->
 *   coaches caller -> dispatcher receives brief
 *
 * BACKEND TODO: this entire generator is a stand-in for the real
 * WebSocket stream. Once connected, delete this file and
 * useSimulatedWebSocket.js, and instead subscribe to the live socket
 * using the message contract in websocketContract.js.
 */

const SCENARIOS = [
  {
    service: "ambulance",
    callerNumber: "+233 24 *** 7782",
    language: "TW",
    incidentType: "Severe bleeding — workshop injury",
    severity: "CRITICAL",
    recommendedUnit: "Ambulance — ALS unit",
    confidence: 0.92,
    summary:
      "Caller reports a co-worker has a deep laceration to the forearm from machinery. Heavy bleeding, patient conscious.",
    landmark: "Suame Magazine, third row of mechanic stalls",
    directions: "Enter from the main Suame road, ask for the welding row.",
    firstAidProtocol: "Bleeding control — direct pressure",
  },
  {
    service: "fire",
    callerNumber: "+233 55 *** 3340",
    language: "EN",
    incidentType: "Electrical fire — small office building",
    severity: "URGENT",
    recommendedUnit: "Fire Service — single engine",
    confidence: 0.85,
    summary:
      "Caller reports smoke from a wall socket on the second floor. Building partially evacuated.",
    landmark: "Adum, opposite the old GCB bank branch",
    directions:
      "Take the side entrance on Kejetia Road, building has a blue gate.",
    firstAidProtocol: "Fire safety — evacuation confirmation",
  },
  {
    service: "ambulance",
    callerNumber: "+233 27 *** 1198",
    language: "GA",
    incidentType: "Difficulty breathing — elderly patient",
    severity: "URGENT",
    recommendedUnit: "Ambulance — BLS unit",
    confidence: 0.88,
    summary:
      "Caller reports their father, 72, is having trouble breathing. Conscious, sitting upright, no chest pain reported.",
    landmark: "Madina Zongo Junction, blue compound house",
    directions: "Just past the junction taxi rank, gate faces the main road.",
    firstAidProtocol: "Breathing difficulty — positioning guidance",
  },
];

let scenarioIndex = 0;

/**
 * Returns an ordered array of { delayMs, message } objects. Each
 * `message` matches the envelope documented in websocketContract.js.
 * The caller (useSimulatedWebSocket) is responsible for actually
 * scheduling these with setTimeout / dispatching them in order.
 */
export function buildMockCallSequence() {
  const scenario = SCENARIOS[scenarioIndex % SCENARIOS.length];
  scenarioIndex += 1;

  const callId = `call-${Math.floor(9300 + Math.random() * 600)}`;
  const now = Date.now();

  const initialCall = {
    id: callId,
    service: scenario.service,
    severity: "URGENT",
    isPrank: false,
    language: scenario.language,
    callerNumber: scenario.callerNumber,
    receivedAt: now,
    status: "active",
    location: {
      lat: null,
      lng: null,
      landmark: "Resolving…",
      directions: null,
    },
    brief: {
      incidentType: "Triage in progress…",
      severity: "URGENT",
      recommendedUnit: null,
      confidence: null,
      summary: "",
    },
    firstAid: null,
    timeline: [
      { id: 1, type: "call_received", label: "Call received", timestamp: 0 },
    ],
  };

  return [
    {
      delayMs: 0,
      message: { type: "call_created", callId, ts: now, payload: initialCall },
    },
    {
      delayMs: 2500,
      message: {
        type: "timeline_event",
        callId,
        ts: now + 2500,
        payload: {
          event: {
            id: 2,
            type: "transcription",
            label: `Transcription started (${scenario.language})`,
            timestamp: 2,
          },
        },
      },
    },
    {
      delayMs: 5000,
      message: {
        type: "triage_update",
        callId,
        ts: now + 5000,
        payload: {
          brief: {
            incidentType: scenario.incidentType,
            severity: scenario.severity,
            recommendedUnit: scenario.recommendedUnit,
            confidence: scenario.confidence,
            summary: scenario.summary,
          },
          severity: scenario.severity,
        },
      },
    },
    {
      delayMs: 5200,
      message: {
        type: "timeline_event",
        callId,
        ts: now + 5200,
        payload: {
          event: {
            id: 3,
            type: "triage",
            label: `AI triage: ${scenario.severity} — ${scenario.incidentType}`,
            timestamp: 5,
          },
        },
      },
    },
    {
      delayMs: 8000,
      message: {
        type: "location_resolved",
        callId,
        ts: now + 8000,
        payload: {
          location: {
            lat: 6.6885 + (Math.random() - 0.5) * 0.05,
            lng: -1.6244 + (Math.random() - 0.5) * 0.05,
            landmark: scenario.landmark,
            directions: scenario.directions,
          },
        },
      },
    },
    {
      delayMs: 8200,
      message: {
        type: "timeline_event",
        callId,
        ts: now + 8200,
        payload: {
          event: {
            id: 4,
            type: "location",
            label: `Location resolved: ${scenario.landmark}`,
            timestamp: 8,
          },
        },
      },
    },
    {
      delayMs: 11000,
      message: {
        type: "first_aid_step",
        callId,
        ts: now + 11000,
        payload: {
          firstAid: {
            protocol: scenario.firstAidProtocol,
            currentStep: 1,
            totalSteps: 4,
          },
        },
      },
    },
    {
      delayMs: 11200,
      message: {
        type: "timeline_event",
        callId,
        ts: now + 11200,
        payload: {
          event: {
            id: 5,
            type: "first_aid",
            label: `${scenario.firstAidProtocol} started`,
            timestamp: 11,
          },
        },
      },
    },
    {
      delayMs: 16000,
      message: {
        type: "first_aid_step",
        callId,
        ts: now + 16000,
        payload: {
          firstAid: {
            protocol: scenario.firstAidProtocol,
            currentStep: 2,
            totalSteps: 4,
          },
        },
      },
    },
  ];
}

// Re-export so consumers only need to import from this file.
export { WEBSOCKET_MESSAGE_TYPES };
