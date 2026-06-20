/**
 * EmptyState — shown when a list has nothing in it yet (no prank calls
 * queued, no active calls). Treated as direction, not decoration: say
 * what's true right now and what will appear here.
 */
export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-nkwa-50 text-nkwa-400 flex items-center justify-center mb-4">
          <Icon className="w-7 h-7" strokeWidth={2} />
        </div>
      )}
      <p className="text-ink-900 font-semibold text-base">{title}</p>
      {description && <p className="text-ink-500 text-sm mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
