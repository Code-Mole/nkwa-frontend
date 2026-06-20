/**
 * WebSocket message contract (DRAFT — not yet confirmed with backend).
 *
 * This file documents the message shape the dashboard expects to
 * receive over the WebSocket connection described in the role doc
 * ("React dispatcher dashboard connected via WebSocket") and in the
 * architecture doc ("Dashboard: React + WebSocket API Gateway").
 *
 * Nothing here is executable config — it exists so the backend
 * developer and frontend developer can agree on a schema before
 * wiring the real connection, and so `mockWebSocketEvents.js` has a
 * single source of truth to simulate against.
 *
 * BACKEND TODO: confirm every field below against the real Bedrock /
 * DynamoDB / Step Functions output before treating this as final.
 * Field names are our best guess from the architecture doc, not a
 * confirmed contract.
 *
 * ---------------------------------------------------------------
 * Envelope — every message on the socket has this shape:
 *   { type: string, callId: string, payload: object, ts: number }
 * ---------------------------------------------------------------
 *
 * type: 'call_created'
 *   Sent once when a new call is first triaged enough to show up in
 *   the live feed. payload is a full call object — see data/mockCalls.js
 *   MOCK_CALLS entries for the expected shape (service, severity,
 *   isPrank, language, callerNumber, receivedAt, status, location,
 *   brief, firstAid, timeline).
 *
 * type: 'triage_update'
 *   Sent as Bedrock refines its triage (e.g. severity changes from
 *   URGENT to CRITICAL once more audio arrives, or the brief summary
 *   gets more specific). payload: { brief: {...partial brief fields} }
 *
 * type: 'location_resolved'
 *   Sent once AWS Location Service has turned raw GPS into a landmark.
 *   payload: { location: { lat, lng, landmark, directions } }
 *
 * type: 'first_aid_step'
 *   Sent each time the caller advances to a new first-aid step.
 *   payload: { firstAid: { protocol, currentStep, totalSteps } }
 *
 * type: 'timeline_event'
 *   Sent for any event that should append to the call's timeline
 *   (transcription started, triage decided, unit dispatched, etc).
 *   payload: { event: { id, type, label, timestamp } }
 *
 * type: 'call_resolved'
 *   Sent when a call is closed out, either dispatched-and-cleared or
 *   confirmed prank. payload: { status: 'resolved' | 'queued' }
 *
 * ---------------------------------------------------------------
 * Example call_created payload:
 * ---------------------------------------------------------------
 * {
 *   type: 'call_created',
 *   callId: 'call-9301',
 *   ts: 1750000000000,
 *   payload: {
 *     id: 'call-9301',
 *     service: 'ambulance',
 *     severity: 'URGENT',
 *     isPrank: false,
 *     language: 'EN',
 *     callerNumber: '+233 26 *** 0042',
 *     receivedAt: 1750000000000,
 *     status: 'active',
 *     location: { lat: null, lng: null, landmark: 'Resolving…', directions: null },
 *     brief: { incidentType: 'Triage in progress…', severity: 'URGENT', recommendedUnit: null, confidence: null, summary: '' },
 *     firstAid: null,
 *     timeline: [{ id: 1, type: 'call_received', label: 'Call received', timestamp: 0 }],
 *   }
 * }
 */

export const WEBSOCKET_MESSAGE_TYPES = [
  "call_created",
  "triage_update",
  "location_resolved",
  "first_aid_step",
  "timeline_event",
  "call_resolved",
];
