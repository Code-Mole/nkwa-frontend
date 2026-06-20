/**
 * PhoneShell — wraps the caller app in a centered, mobile-width column.
 * The caller app is a real responsive web page (not literally locked to
 * a phone), but constraining its max-width keeps it visually consistent
 * with the mobile app screens it's designed to match, and avoids an
 * awkward stretched-out layout on desktop browsers used for testing.
 */
export default function PhoneShell({ children, gradient = false }) {
  return (
    <div className={gradient ? 'min-h-screen bg-nkwa-gradient' : 'min-h-screen bg-surface'}>
      <div className="max-w-md mx-auto min-h-screen bg-surface relative shadow-2xl">
        {children}
      </div>
    </div>
  );
}
