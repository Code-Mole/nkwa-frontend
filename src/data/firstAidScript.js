/**
 * Mock first-aid guidance steps shown/spoken to the caller while
 * waiting for dispatch. Content mirrors the mobile app's "Choking
 * (adult)" first-aid guide structure (overview + numbered steps).
 *
 * BACKEND TODO: replace this static script with the actual guidance
 * selected by Bedrock + the Knowledge Base RAG pipeline based on the
 * incident type extracted from the call audio. The frontend should
 * receive something like:
 *   { incidentType, steps: [{ id, title, body }], language }
 * over the same WebSocket connection used for call status updates.
 */
export const MOCK_FIRST_AID_SCRIPT = {
  incidentType: 'Choking (adult)',
  steps: [
    {
      id: 1,
      title: 'Stay on the line',
      body: "Help is on the way. Stay calm and keep your phone close — don't hang up.",
    },
    {
      id: 2,
      title: 'Ask if they can cough',
      body: 'If the person can speak or cough forcefully, encourage them to keep coughing. A strong cough can clear the blockage on its own.',
    },
    {
      id: 3,
      title: 'Lean them forward',
      body: 'Stand to the side and slightly behind. Support their chest with one hand and lean them forward.',
    },
    {
      id: 4,
      title: 'Give 5 back blows',
      body: 'Using the heel of your other hand, strike firmly between the shoulder blades, 5 times.',
    },
    {
      id: 5,
      title: 'Check again',
      body: 'If the object has not cleared, dispatchers and responders have your location and are on their way.',
    },
  ],
};

/**
 * Mock translated waiting-room phrases, keyed by language code, shown
 * at the top of the in-call screen while audio guidance plays.
 *
 * BACKEND TODO: real translations + audio come from Amazon Polly (per
 * the AWS services table — "Non-critical text to speech") layered on
 * top of the Bedrock-generated guidance text.
 */
export const WAITING_MESSAGES = {
  EN: "You're connected. Help is on the way.",
  TW: 'Wɔahyɛ aseɛ. Mmoa reba.',
  GA: 'Atsɔɔ kɛkɛ. Mɔ baa.',
  EW: 'Wò kpɔ adze. Kpekpeɖeŋu le mɔ dzi.',
};
