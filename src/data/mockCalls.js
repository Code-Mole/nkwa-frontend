/**
 * Mock call records for the dispatcher dashboard. Shape here is meant
 * to mirror what will eventually arrive over the WebSocket connection
 * from the backend (see BACKEND TODO in DashboardContext.jsx for the
 * real message contract once it's defined).
 *
 * Field notes:
 *   severity      'CRITICAL' | 'URGENT' | 'NON_EMERGENCY'
 *   isPrank       true if AI triage flagged this as a hoax/prank call
 *   language      detected spoken language code (see data/constants.js)
 *   location      { lat, lng, landmark, directions } — landmark text is
 *                 what AWS Location Service would resolve GPS to
 *   brief         the AI-generated dispatcher brief (incident type,
 *                 recommended unit, confidence)
 *   timeline      ordered list of events for the call detail view
 */

export const MOCK_CALLS = [
  {
    id: "call-9123",
    service: "ambulance",
    severity: "CRITICAL",
    isPrank: false,
    language: "TW",
    callerNumber: "+233 24 *** 2291",
    receivedAt: Date.now() - 1000 * 45,
    status: "active",
    location: {
      lat: 5.6037,
      lng: -0.187,
      landmark: "Near Kwame Nkrumah Circle, behind Game shopping mall",
      directions:
        "Take the Circle interchange exit toward Graphic Road, second junction on the right.",
    },
    brief: {
      incidentType: "Cardiac arrest — adult male, unconscious",
      severity: "CRITICAL",
      recommendedUnit: "Ambulance — ALS unit",
      confidence: 0.94,
      summary:
        "Caller reports a 60-year-old male collapsed, not breathing normally. Caller is alone with patient and has not started CPR.",
    },
    firstAid: {
      protocol: "CPR guidance — adult, unresponsive",
      currentStep: 2,
      totalSteps: 5,
    },
    timeline: [
      { id: 1, type: "call_received", label: "Call received", timestamp: -45 },
      {
        id: 2,
        type: "transcription",
        label: "Transcription started (Twi)",
        timestamp: -43,
      },
      {
        id: 3,
        type: "triage",
        label: "AI triage: CRITICAL — cardiac arrest",
        timestamp: -38,
      },
      {
        id: 4,
        type: "location",
        label: "Location resolved: Kwame Nkrumah Circle",
        timestamp: -36,
      },
      {
        id: 5,
        type: "first_aid",
        label: "CPR guidance started",
        timestamp: -30,
      },
    ],
  },
  {
    id: "call-9124",
    service: "fire",
    severity: "URGENT",
    isPrank: false,
    language: "EN",
    callerNumber: "+233 20 *** 7710",
    receivedAt: Date.now() - 1000 * 120,
    status: "active",
    location: {
      lat: 5.5731,
      lng: -0.2469,
      landmark: "Behind Dansoman roundabout, near the blue-roofed school",
      directions:
        "Enter from the High Street junction, third compound on the left after the roundabout.",
    },
    brief: {
      incidentType: "Kitchen fire — contained, spreading risk to roof",
      severity: "URGENT",
      recommendedUnit: "Fire Service — single engine",
      confidence: 0.87,
      summary:
        "Caller reports a kitchen fire that has spread to a wooden roof beam. Household has evacuated. No injuries reported.",
    },
    firstAid: {
      protocol: "Fire safety — evacuation confirmation",
      currentStep: 3,
      totalSteps: 3,
    },
    timeline: [
      { id: 1, type: "call_received", label: "Call received", timestamp: -120 },
      {
        id: 2,
        type: "transcription",
        label: "Transcription started (English)",
        timestamp: -118,
      },
      {
        id: 3,
        type: "triage",
        label: "AI triage: URGENT — structure fire",
        timestamp: -112,
      },
      {
        id: 4,
        type: "location",
        label: "Location resolved: Dansoman roundabout",
        timestamp: -108,
      },
    ],
  },
  {
    id: "call-9125",
    service: "police",
    severity: "NON_EMERGENCY",
    isPrank: false,
    language: "GA",
    callerNumber: "+233 27 *** 4456",
    receivedAt: Date.now() - 1000 * 300,
    status: "active",
    location: {
      lat: 5.6145,
      lng: -0.2057,
      landmark: "Osu Oxford Street, opposite Papaye restaurant",
      directions: "Main entrance faces Oxford Street directly, blue gate.",
    },
    brief: {
      incidentType: "Noise complaint — ongoing",
      severity: "NON_EMERGENCY",
      recommendedUnit: "Police — community patrol",
      confidence: 0.78,
      summary:
        "Caller reports a loud, ongoing disturbance from a neighbouring property after 11pm.",
    },
    firstAid: null,
    timeline: [
      { id: 1, type: "call_received", label: "Call received", timestamp: -300 },
      {
        id: 2,
        type: "transcription",
        label: "Transcription started (Ga)",
        timestamp: -297,
      },
      {
        id: 3,
        type: "triage",
        label: "AI triage: NON_EMERGENCY — noise complaint",
        timestamp: -290,
      },
    ],
  },
  {
    id: "call-9119",
    service: "ambulance",
    severity: "PRANK",
    isPrank: true,
    language: "EN",
    callerNumber: "+233 50 *** 9982",
    receivedAt: Date.now() - 1000 * 600,
    status: "queued",
    location: {
      lat: null,
      lng: null,
      landmark: "Unresolved",
      directions: null,
    },
    brief: {
      incidentType:
        "Likely prank — repeated caller, no coherent emergency description",
      severity: "PRANK",
      recommendedUnit: null,
      confidence: 0.91,
      summary:
        "Caller laughing, background noise consistent with a group setting. No emergency details provided after 30s.",
    },
    firstAid: null,
    timeline: [
      { id: 1, type: "call_received", label: "Call received", timestamp: -600 },
      {
        id: 2,
        type: "triage",
        label: "AI triage: flagged as PRANK",
        timestamp: -595,
      },
      {
        id: 3,
        type: "queued",
        label: "De-prioritised to prank queue",
        timestamp: -594,
      },
    ],
  },
  {
    id: "call-9117",
    service: "sos",
    severity: "PRANK",
    isPrank: true,
    language: "TW",
    callerNumber: "+233 24 *** 1123",
    receivedAt: Date.now() - 1000 * 920,
    status: "queued",
    location: {
      lat: null,
      lng: null,
      landmark: "Unresolved",
      directions: null,
    },
    brief: {
      incidentType:
        "Likely prank — silence after connection, repeated dial pattern",
      severity: "PRANK",
      recommendedUnit: null,
      confidence: 0.83,
      summary:
        "Third call from this number in the last hour. No response to dispatcher prompts.",
    },
    firstAid: null,
    timeline: [
      { id: 1, type: "call_received", label: "Call received", timestamp: -920 },
      {
        id: 2,
        type: "triage",
        label: "AI triage: flagged as PRANK",
        timestamp: -915,
      },
      {
        id: 3,
        type: "queued",
        label: "De-prioritised to prank queue",
        timestamp: -914,
      },
    ],
  },
  {
    id: "call-9110",
    service: "ambulance",
    severity: "NON_EMERGENCY",
    isPrank: false,
    language: "EN",
    callerNumber: "+233 23 *** 5567",
    receivedAt: Date.now() - 1000 * 1800,
    status: "resolved",
    location: {
      lat: 5.56,
      lng: -0.2057,
      landmark: "Adabraka, near the old post office",
      directions: "Resolved — unit dispatched and cleared.",
    },
    brief: {
      incidentType: "Minor fall — elderly patient, ambulatory",
      severity: "NON_EMERGENCY",
      recommendedUnit: "Ambulance — BLS unit",
      confidence: 0.89,
      summary:
        "Caller reports their grandmother fell but is conscious and able to speak normally.",
    },
    firstAid: null,
    timeline: [
      {
        id: 1,
        type: "call_received",
        label: "Call received",
        timestamp: -1800,
      },
      {
        id: 2,
        type: "triage",
        label: "AI triage: NON_EMERGENCY — minor fall",
        timestamp: -1793,
      },
      {
        id: 3,
        type: "dispatched",
        label: "BLS unit dispatched",
        timestamp: -1700,
      },
      { id: 4, type: "resolved", label: "Call resolved", timestamp: -1200 },
    ],
  },
];

/**
 * A single incoming call used by the dashboard's live-event simulation
 * (see hooks/useSimulatedCallFeed.js) to demonstrate a new call arriving
 * mid-demo without needing the real backend connected yet.
 *
 * BACKEND TODO: this entire object shape is a stand-in for whatever
 * arrives as a WebSocket message when a new call is triaged. Confirm
 * the real schema with the backend/AI engineers before wiring this up
 * for real — field names here are our best guess from the architecture
 * doc, not a confirmed contract.
 */
export function buildIncomingCall(overrides = {}) {
  const id = `call-${Math.floor(9200 + Math.random() * 800)}`;
  return {
    id,
    service: "ambulance",
    severity: "URGENT",
    isPrank: false,
    language: "EN",
    callerNumber: "+233 26 *** 0042",
    receivedAt: Date.now(),
    status: "active",
    location: {
      lat: 5.59,
      lng: -0.21,
      landmark: "Accra Mall roundabout, near the Shell station",
      directions: "Resolving directions…",
    },
    brief: {
      incidentType: "Triage in progress…",
      severity: "URGENT",
      recommendedUnit: null,
      confidence: null,
      summary: "Brief is being generated from the live call.",
    },
    firstAid: null,
    timeline: [
      { id: 1, type: "call_received", label: "Call received", timestamp: 0 },
    ],
    ...overrides,
  };
}
