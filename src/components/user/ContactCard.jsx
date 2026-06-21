import { Phone, Mail, Pencil, Trash2 } from "lucide-react";

// Each string here is a complete, literal Tailwind class list (not
// template-interpolated), so Tailwind's scanner can see and generate
// every one of them even though we pick an entry by array index below.
const INITIAL_BG = [
  "bg-service-ambulanceBg text-service-ambulance",
  "bg-service-fireBg text-service-fire",
  "bg-service-policeBg text-service-police",
  "bg-service-sosBg text-service-sos",
];

function colorForName(name) {
  const code = (name?.charCodeAt(0) ?? 0) + (name?.charCodeAt(1) ?? 0);
  return INITIAL_BG[code % INITIAL_BG.length];
}

/**
 * ContactCard — one row in the emergency contacts list, matching the
 * mobile app's Contacts screen (initials avatar, name, relationship
 * tag, edit/delete icons, phone number with a Notify toggle).
 */
export default function ContactCard({
  contact,
  onEdit,
  onDelete,
  onToggleNotify,
}) {
  const initials = contact.fullName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl shadow-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${colorForName(contact.fullName)}`}
          >
            {initials || "?"}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-ink-900 truncate">
              {contact.fullName}
            </p>
            {contact.email && (
              <p className="text-xs text-ink-400 flex items-center gap-1 truncate">
                <Mail className="w-3 h-3 flex-shrink-0" /> {contact.email}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {contact.relationship && (
            <span className="text-xs font-medium text-nkwa-600 bg-nkwa-50 px-2 py-1 rounded-full mr-1 hidden sm:inline-block">
              {contact.relationship}
            </span>
          )}
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${contact.fullName}`}
            className="w-8 h-8 rounded-lg bg-nkwa-50 text-nkwa-500 flex items-center justify-center hover:bg-nkwa-100 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Remove ${contact.fullName}`}
            className="w-8 h-8 rounded-lg bg-severity-criticalBg text-severity-critical flex items-center justify-center hover:bg-[#FBDCE1] transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-nkwa-50">
        <span className="flex items-center gap-1.5 text-sm text-ink-600">
          <Phone className="w-3.5 h-3.5 text-ink-400" />{" "}
          {contact.phone || "No phone number"}
        </span>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <span className="text-xs text-ink-400">Notify</span>
          <button
            type="button"
            role="switch"
            aria-checked={contact.notify}
            onClick={onToggleNotify}
            className={[
              "w-9 h-5 rounded-full transition-colors relative flex-shrink-0",
              contact.notify ? "bg-nkwa-500" : "bg-nkwa-100",
            ].join(" ")}
          >
            <span
              className={[
                "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform",
                contact.notify ? "translate-x-[18px]" : "translate-x-0.5",
              ].join(" ")}
            />
          </button>
        </label>
      </div>
    </div>
  );
}
