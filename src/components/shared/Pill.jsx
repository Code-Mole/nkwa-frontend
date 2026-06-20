/**
 * Pill — small rounded chip used for language/service tags ("English",
 * "Ambulance"), location tags ("Greater Accra"), and filter toggles
 * ("Offline guides" / "AI assistance").
 */
export default function Pill({
  children,
  icon: Icon,
  active = false,
  onClick,
  tone = 'light', // 'light' (on white bg) | 'dark' (on purple bg)
  className = '',
}) {
  const base = 'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors';

  const toneClasses = active
    ? 'bg-nkwa-gradient text-white'
    : tone === 'dark'
      ? 'bg-white/15 text-white hover:bg-white/25'
      : 'bg-nkwa-50 text-nkwa-700 hover:bg-nkwa-100';

  const Comp = onClick ? 'button' : 'span';

  return (
    <Comp
      onClick={onClick}
      type={onClick ? 'button' : undefined}
      className={[base, toneClasses, className].join(' ')}
    >
      {Icon && <Icon className="w-3.5 h-3.5" strokeWidth={2.25} />}
      {children}
    </Comp>
  );
}
