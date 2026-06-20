/**
 * SeverityBadge — the single most important visual signal in the whole
 * system. Dispatcher dashboard spec calls for "severity colour coding:
 * red for CRITICAL, amber for URGENT, green for NON_EMERGENCY". Prank
 * calls get a neutral grey so they read as de-prioritised, not as a
 * fourth severity tier.
 */
const CONFIG = {
  CRITICAL: {
    label: 'Critical',
    text: 'text-severity-critical',
    bg: 'bg-severity-criticalBg',
    dot: 'bg-severity-critical',
  },
  URGENT: {
    label: 'Urgent',
    text: 'text-severity-urgent',
    bg: 'bg-severity-urgentBg',
    dot: 'bg-severity-urgent',
  },
  NON_EMERGENCY: {
    label: 'Non-emergency',
    text: 'text-severity-nonEmergency',
    bg: 'bg-severity-nonEmergencyBg',
    dot: 'bg-severity-nonEmergency',
  },
  PRANK: {
    label: 'Prank',
    text: 'text-severity-prank',
    bg: 'bg-severity-prankBg',
    dot: 'bg-severity-prank',
  },
};

export default function SeverityBadge({ severity, size = 'md', pulse = false, className = '' }) {
  const cfg = CONFIG[severity] ?? CONFIG.NON_EMERGENCY;
  const sizeClasses =
    size === 'sm' ? 'text-xs px-2 py-0.5 gap-1' : 'text-sm px-3 py-1 gap-1.5';

  return (
    <span
      className={[
        'inline-flex items-center rounded-full font-semibold',
        cfg.bg,
        cfg.text,
        sizeClasses,
        className,
      ].join(' ')}
    >
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full rounded-full ${cfg.dot}`} />
        {pulse && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full ${cfg.dot} animate-pulse-ring`}
          />
        )}
      </span>
      {cfg.label}
    </span>
  );
}

export { CONFIG as SEVERITY_CONFIG };
