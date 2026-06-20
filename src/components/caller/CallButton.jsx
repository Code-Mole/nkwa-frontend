import { Phone, PhoneOff } from 'lucide-react';

/**
 * CallButton — the large circular purple button from the mobile app's
 * Ambulance call screen ("Tap to call Ambulance" / mid-call state).
 * Concentric pulsing rings communicate "live" without needing motion
 * elsewhere on screen.
 */
export default function CallButton({ state = 'idle', onClick }) {
  // state: 'idle' (tap to call) | 'connecting' | 'active'
  const isLive = state === 'connecting' || state === 'active';

  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      {isLive && (
        <>
          <span className="absolute inset-0 rounded-full bg-nkwa-400/40 animate-pulse-ring" />
          <span
            className="absolute inset-0 rounded-full bg-nkwa-400/30 animate-pulse-ring"
            style={{ animationDelay: '0.6s' }}
          />
        </>
      )}
      <div className="absolute inset-4 rounded-full bg-nkwa-100" />
      <button
        type="button"
        onClick={onClick}
        aria-label={state === 'active' ? 'End call' : 'Place call'}
        className={[
          'relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-transform active:scale-95',
          state === 'active' ? 'bg-severity-critical' : 'bg-nkwa-gradient',
          'shadow-card-lg',
        ].join(' ')}
      >
        {state === 'active' ? (
          <PhoneOff className="w-9 h-9 text-white" strokeWidth={2.25} />
        ) : (
          <Phone className="w-9 h-9 text-white" strokeWidth={2.25} />
        )}
      </button>
    </div>
  );
}
