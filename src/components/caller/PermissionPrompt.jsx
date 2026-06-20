import { Mic, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import Button from '../shared/Button';

/**
 * PermissionPrompt — shown briefly while requesting mic + GPS access,
 * and as an error state if either is denied. The caller app cannot
 * function without both (per the Caller Web App Flow in the role doc:
 * "Grants microphone permission and location permission"), so this is
 * a hard gate, not a dismissible suggestion.
 */
export default function PermissionPrompt({ stage, error, onRetry }) {
  if (error) {
    const isMic = error === 'mic';
    return (
      <div className="flex flex-col items-center text-center px-6 py-10">
        <div className="w-14 h-14 rounded-2xl bg-severity-criticalBg text-severity-critical flex items-center justify-center mb-4">
          <AlertCircle className="w-7 h-7" strokeWidth={2} />
        </div>
        <p className="font-bold text-ink-900 text-lg">
          {isMic ? 'Microphone access needed' : 'Location access needed'}
        </p>
        <p className="text-ink-500 text-sm mt-2 max-w-xs">
          {isMic
            ? 'Nkwa needs your microphone to connect your call to a dispatcher. Please allow access in your browser settings and try again.'
            : 'Nkwa needs your location to send responders to you without a street address. Please allow access in your browser settings and try again.'}
        </p>
        <Button variant="primary" className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center px-6 py-10">
      <div className="relative w-14 h-14 mb-4">
        <div className="absolute inset-0 rounded-2xl bg-nkwa-100 flex items-center justify-center">
          <Loader2 className="w-7 h-7 text-nkwa-600 animate-spin" strokeWidth={2} />
        </div>
      </div>
      <p className="font-bold text-ink-900 text-lg">Requesting access…</p>
      <div className="flex items-center gap-4 mt-4 text-ink-500 text-sm">
        <span className="flex items-center gap-1.5">
          <Mic className="w-4 h-4" /> Microphone
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" /> Location
        </span>
      </div>
      <p className="text-ink-400 text-xs mt-3 max-w-xs">
        Allow both when your browser asks, so dispatchers can hear you and find you.
      </p>
    </div>
  );
}
