/**
 * IconBadge — the soft, rounded-square coloured icon containers seen
 * behind Ambulance / Fire Service / Police / SOS Alert on the mobile
 * Home screen. Reused on dashboard service tags and call-type icons.
 */
const TONE_CLASSES = {
  ambulance: 'bg-service-ambulanceBg text-service-ambulance',
  fire: 'bg-service-fireBg text-service-fire',
  police: 'bg-service-policeBg text-service-police',
  sos: 'bg-service-sosBg text-service-sos',
  neutral: 'bg-nkwa-50 text-nkwa-600',
};

const SIZE_CLASSES = {
  sm: 'w-9 h-9 rounded-xl',
  md: 'w-12 h-12 rounded-2xl',
  lg: 'w-16 h-16 rounded-2xl',
};

export default function IconBadge({ icon: Icon, tone = 'neutral', size = 'md', className = '' }) {
  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-7 h-7' : 'w-5 h-5';
  return (
    <div
      className={[
        'flex items-center justify-center flex-shrink-0',
        TONE_CLASSES[tone],
        SIZE_CLASSES[size],
        className,
      ].join(' ')}
    >
      <Icon className={iconSize} strokeWidth={2.25} />
    </div>
  );
}
