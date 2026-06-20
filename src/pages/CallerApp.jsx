import { Eye, ChevronLeft } from 'lucide-react';
import PhoneShell from '../components/caller/PhoneShell';
import ServiceSelect from '../components/caller/ServiceSelect';
import PermissionPrompt from '../components/caller/PermissionPrompt';
import CallButton from '../components/caller/CallButton';
import InCallGuidance from '../components/caller/InCallGuidance';
import Pill from '../components/shared/Pill';
import Button from '../components/shared/Button';
import { useCallFlow } from '../hooks/useCallFlow';
import { LANGUAGES } from '../data/constants';

/**
 * CallerApp — the browser page opened on a caller's phone. Implements
 * the flow from the frontend role doc:
 *   1. Caller opens the URL
 *   2. Grants mic + location permission
 *   3. Selects language (one tap)
 *   4. Taps the call button — audio + GPS stream to backend
 *   5. Hears first-aid guidance in their language while waiting
 */
export default function CallerApp() {
  const flow = useCallFlow();

  const readyToProceed = flow.service && flow.language;

  // ---- Selection screen (service + language) ----
  if (flow.stage === 'select') {
    return (
      <PhoneShell>
        <div className="px-6 pt-8 pb-4 flex items-center gap-2">
          <Eye className="w-6 h-6 text-nkwa-600" strokeWidth={2.5} />
          <span className="text-xl font-bold text-ink-900">nkwa</span>
        </div>

        <div className="px-6">
          <h1 className="text-2xl font-bold text-ink-900 mb-1">Place emergency call</h1>
          <p className="text-ink-500 text-sm mb-6">
            Choose a service and your language. We'll handle the rest.
          </p>

          {flow.permissionError && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-severity-criticalBg text-severity-critical text-sm">
              {flow.permissionError === 'mic'
                ? 'Microphone access was denied. Allow it to continue.'
                : 'Location access was denied. Allow it to continue.'}
            </div>
          )}

          <p className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-3">
            Service
          </p>
          <ServiceSelect value={flow.service} onChange={flow.setService} />

          <p className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-3 mt-7">
            Language
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {LANGUAGES.map((lang) => (
              <Pill
                key={lang.code}
                active={flow.language?.code === lang.code}
                onClick={() => flow.setLanguage(lang)}
              >
                {lang.label}
              </Pill>
            ))}
          </div>
        </div>

        <div className="px-6 pb-8 sticky bottom-0 bg-surface pt-2">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={!readyToProceed}
            onClick={flow.requestPermissions}
          >
            Continue
          </Button>
        </div>
      </PhoneShell>
    );
  }

  // ---- Permissions screen ----
  if (flow.stage === 'permissions') {
    return (
      <PhoneShell>
        <div className="px-6 pt-8 pb-4 flex items-center gap-2">
          <Eye className="w-6 h-6 text-nkwa-600" strokeWidth={2.5} />
          <span className="text-xl font-bold text-ink-900">nkwa</span>
        </div>
        <PermissionPrompt stage={flow.stage} onRetry={flow.requestPermissions} />
      </PhoneShell>
    );
  }

  // ---- Ready / Calling / Active — purple call screen ----
  if (flow.stage === 'ready' || flow.stage === 'calling' || flow.stage === 'active') {
    const isActive = flow.stage === 'active';
    const isCalling = flow.stage === 'calling';

    return (
      <PhoneShell gradient>
        <div className="bg-nkwa-gradient min-h-screen flex flex-col">
          <div className="px-6 pt-8 pb-4 flex items-center gap-3">
            <button
              type="button"
              onClick={flow.reset}
              aria-label="Back"
              className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <p className="text-white font-bold">{flow.service?.label}</p>
              <p className="text-white/60 text-xs">Service</p>
            </div>
          </div>

          <div className="px-6 mb-6">
            <div className="flex gap-2">
              <Pill tone="dark">{flow.service?.label}</Pill>
              <Pill tone="dark">{flow.language?.label}</Pill>
            </div>
          </div>

          {!isActive && (
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <CallButton
                state={isCalling ? 'connecting' : 'idle'}
                onClick={flow.stage === 'ready' ? flow.placeCall : undefined}
              />
              <p className="text-white font-bold text-lg mt-6">
                {isCalling ? 'Placing call…' : `Tap to call ${flow.service?.label}`}
              </p>
              <p className="text-white/60 text-sm mt-1">
                {isCalling ? `Calling in ${flow.language?.label}` : `in ${flow.language?.label}`}
              </p>
            </div>
          )}

          {isActive && (
            <div className="flex-1 flex flex-col">
              <div className="flex flex-col items-center mb-6">
                <CallButton state="active" onClick={flow.endCall} />
                <p className="text-white font-bold text-lg mt-4">Connected</p>
              </div>
              <InCallGuidance language={flow.language} elapsedSeconds={flow.elapsedSeconds} />
            </div>
          )}

          <div className="px-6 pb-8 pt-4">
            {flow.stage === 'ready' && (
              <Button variant="secondary" fullWidth size="lg" onClick={flow.reset}>
                Cancel
              </Button>
            )}
            {isCalling && (
              <Button variant="secondary" fullWidth size="lg" onClick={flow.cancelCall}>
                Cancel
              </Button>
            )}
            {isActive && (
              <Button variant="dangerSolid" fullWidth size="lg" onClick={flow.endCall}>
                End call
              </Button>
            )}
          </div>
        </div>
      </PhoneShell>
    );
  }

  // ---- Ended ----
  if (flow.stage === 'ended') {
    return (
      <PhoneShell>
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-service-ambulanceBg text-service-ambulance flex items-center justify-center mb-5">
            <Eye className="w-8 h-8" strokeWidth={2} />
          </div>
          <h1 className="text-xl font-bold text-ink-900">Call ended</h1>
          <p className="text-ink-500 text-sm mt-2 max-w-xs">
            Responders have your location and the brief our dispatcher needs. Stay where it's
            safe.
          </p>
          <Button variant="primary" className="mt-8" onClick={flow.reset}>
            Done
          </Button>
        </div>
      </PhoneShell>
    );
  }

  return null;
}
