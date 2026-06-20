/**
 * GradientHeader — the deep-violet-to-purple curved header block that
 * tops nearly every mobile screen (Home profile card, Contacts,
 * Settings, the Ambulance call screen). Recreated here as a reusable
 * banner for the web app's page headers so both surfaces read as the
 * same product.
 *
 * The decorative circles in the corner echo the concentric rings seen
 * on the onboarding screens and call screen background.
 */
export default function GradientHeader({
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
  decorative = true,
}) {
  return (
    <div
      className={[
        'relative overflow-hidden bg-nkwa-gradient rounded-b-[2rem] px-6 pt-6 pb-7',
        className,
      ].join(' ')}
    >
      {decorative && (
        <>
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full border border-white/15" />
          <div className="absolute -top-2 -right-2 w-28 h-28 rounded-full border border-white/15" />
        </>
      )}
      <div className="relative z-10">
        {eyebrow && (
          <p className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">
            {eyebrow}
          </p>
        )}
        {title && <h1 className="text-white text-2xl font-bold">{title}</h1>}
        {subtitle && <p className="text-white/70 text-sm mt-1">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
