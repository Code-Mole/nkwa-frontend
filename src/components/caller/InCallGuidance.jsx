import { Volume2 } from 'lucide-react';
import { MOCK_FIRST_AID_SCRIPT, WAITING_MESSAGES } from '../../data/firstAidScript';

function formatTimer(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/**
 * InCallGuidance — shown once a call is active. Mirrors "Talks the
 * caller through first aid in their own language" from the idea
 * submission. Currently steps through a fixed mock script on a timer;
 * see BACKEND TODO for where real AI-driven guidance plugs in.
 */
export default function InCallGuidance({ language, elapsedSeconds }) {
  const waitingMessage = WAITING_MESSAGES[language?.code] ?? WAITING_MESSAGES.EN;

  // BACKEND TODO: step index should come from the backend's guidance
  // stream (it knows what's actually been spoken to the caller), not a
  // local timer. Swapping this for server-driven state is a drop-in
  // replacement — everything below just renders whatever step index
  // it's given.
  const stepIndex = Math.min(
    Math.floor(elapsedSeconds / 6),
    MOCK_FIRST_AID_SCRIPT.steps.length - 1
  );
  const currentStep = MOCK_FIRST_AID_SCRIPT.steps[stepIndex];

  return (
    <div className="px-6 space-y-5">
      <div className="bg-white/10 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
          <Volume2 className="w-4.5 h-4.5 text-white" strokeWidth={2.25} />
        </div>
        <div>
          <p className="text-white text-sm font-medium">{waitingMessage}</p>
          <p className="text-white/50 text-xs mt-1">
            Speaking in {language?.label ?? 'English'} · {formatTimer(elapsedSeconds)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 animate-fade-in" key={currentStep.id}>
        <p className="text-xs font-semibold text-nkwa-600 uppercase tracking-wide mb-1">
          Step {currentStep.id} of {MOCK_FIRST_AID_SCRIPT.steps.length} ·{' '}
          {MOCK_FIRST_AID_SCRIPT.incidentType}
        </p>
        <p className="text-ink-900 font-bold text-lg mb-2">{currentStep.title}</p>
        <p className="text-ink-700 text-sm leading-relaxed">{currentStep.body}</p>
      </div>

      <div className="flex items-center justify-center gap-1.5">
        {MOCK_FIRST_AID_SCRIPT.steps.map((step, i) => (
          <div
            key={step.id}
            className={[
              'h-1.5 rounded-full transition-all',
              i === stepIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/30',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  );
}
