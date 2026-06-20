/**
 * Card — the white rounded-rectangle container used for every list row
 * and panel in the mobile app (service rows, contact rows, first-aid
 * steps). Sits on the light lavender `surface` background.
 */
export default function Card({ children, className = '', padded = true, hoverable = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={[
        'bg-surface-card rounded-2xl shadow-card',
        padded ? 'p-4' : '',
        hoverable ? 'transition-shadow hover:shadow-card-lg cursor-pointer' : '',
        onClick ? 'cursor-pointer' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
