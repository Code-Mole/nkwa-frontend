import { useState, useEffect } from "react";
import { X, User, Users, Phone, Mail } from "lucide-react";
import Button from "../shared/Button";

/**
 * ContactFormModal — add/edit form for an emergency contact, matching
 * the mobile app's "Add contact / They'll receive your SOS alert
 * instantly" modal.
 */
export default function ContactFormModal({
  open,
  initialContact,
  onClose,
  onSubmit,
}) {
  const [fullName, setFullName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (open) {
      setFullName(initialContact?.fullName ?? "");
      setRelationship(initialContact?.relationship ?? "");
      setPhone(initialContact?.phone ?? "");
      setEmail(initialContact?.email ?? "");
    }
  }, [open, initialContact]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;
    onSubmit({ fullName, relationship, phone, email });
  }

  const isEdit = !!initialContact;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-card-lg w-full max-w-sm p-6 animate-slide-up">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-nkwa-50 text-ink-400 flex items-center justify-center hover:bg-nkwa-100"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-lg font-bold text-ink-900 text-center">
          {isEdit ? "Edit contact" : "Add contact"}
        </h2>
        <p className="text-sm text-ink-500 text-center mt-1 mb-5">
          They'll receive your SOS alert instantly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="contact-name"
              className="block text-sm font-medium text-ink-700 mb-1.5"
            >
              Full name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="contact-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Kofi Mensah"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-nkwa-50 border border-transparent focus:border-nkwa-300 focus:bg-white outline-none text-sm transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-relationship"
              className="block text-sm font-medium text-ink-700 mb-1.5"
            >
              Relationship
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="contact-relationship"
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="e.g. Father, Sister, Friend"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-nkwa-50 border border-transparent focus:border-nkwa-300 focus:bg-white outline-none text-sm transition-colors"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-phone"
              className="block text-sm font-medium text-ink-700 mb-1.5"
            >
              Phone number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+233 24 000 0000"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-nkwa-50 border border-transparent focus:border-nkwa-300 focus:bg-white outline-none text-sm transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block text-sm font-medium text-ink-700 mb-1.5"
            >
              Email <span className="text-ink-400 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-nkwa-50 border border-transparent focus:border-nkwa-300 focus:bg-white outline-none text-sm transition-colors"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={Users}
            iconPosition="left"
          >
            {isEdit ? "Save changes" : "Add to my circle"}
          </Button>
        </form>
      </div>
    </div>
  );
}
