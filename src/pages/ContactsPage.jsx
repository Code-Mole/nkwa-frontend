import { useState } from "react";
import { Users, Plus } from "lucide-react";
import UserDashboardShell from "../components/user/UserDashboardShell";
import ContactCard from "../components/user/ContactCard";
import ContactFormModal from "../components/user/ContactFormModal";
import EmptyState from "../components/shared/EmptyState";
import Button from "../components/shared/Button";
import { useEmergencyContacts } from "../context/EmergencyContactsContext";

/**
 * ContactsPage — "Add people closer to them so when a dispatch comes
 * then we notify those people." Matches the mobile app's Contacts /
 * "Emergency Network — Alerted instantly when you press SOS" screen.
 *
 * This page only manages *who* is in the circle and whether each
 * person has notifications on — the actual notification send is a
 * backend responsibility. See BACKEND TODO in
 * context/EmergencyContactsContext.jsx.
 */
export default function ContactsPage() {
  const { contacts, addContact, updateContact, removeContact, toggleNotify } =
    useEmergencyContacts();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  function openAddModal() {
    setEditingContact(null);
    setModalOpen(true);
  }

  function openEditModal(contact) {
    setEditingContact(contact);
    setModalOpen(true);
  }

  function handleSubmit(values) {
    if (editingContact) {
      updateContact(editingContact.id, values);
    } else {
      addContact(values);
    }
    setModalOpen(false);
  }

  const notifyCount = contacts.filter((c) => c.notify).length;

  return (
    <UserDashboardShell>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-ink-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-nkwa-600" />
            Emergency contacts
          </h1>
          <p className="text-sm text-ink-500 mt-1">
            {contacts.length === 0
              ? "Add the people you trust most."
              : `${notifyCount} of ${contacts.length} will be alerted the second you need help.`}
          </p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          iconPosition="left"
          onClick={openAddModal}
        >
          Add contact
        </Button>
      </div>

      {contacts.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Your emergency circle is empty"
          description="Add people you trust. They'll get a high-priority alert with your location the second you call for help."
          action={
            <Button
              variant="primary"
              icon={Plus}
              iconPosition="left"
              onClick={openAddModal}
            >
              Add your first contact
            </Button>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={() => openEditModal(contact)}
              onDelete={() => removeContact(contact.id)}
              onToggleNotify={() => toggleNotify(contact.id)}
            />
          ))}
        </div>
      )}

      <ContactFormModal
        open={modalOpen}
        initialContact={editingContact}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </UserDashboardShell>
  );
}
