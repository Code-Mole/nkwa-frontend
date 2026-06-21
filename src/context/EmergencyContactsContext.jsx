import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useUserAuth } from "./UserAuthContext";

/**
 * EmergencyContactsContext — each citizen's "emergency circle": people
 * who get notified the moment that person places an emergency call or
 * triggers SOS. Matches the mobile app's Contacts screen ("EMERGENCY
 * NETWORK — Alerted instantly when you press SOS").
 *
 * Stored per-user (keyed by the signed-in user's id) so switching
 * accounts doesn't leak one person's contacts into another's view.
 *
 * MOCK DATA — in-memory only, resets on refresh. See BACKEND TODO below
 * for the real wiring.
 *
 * BACKEND TODO: persist contacts server-side, e.g.:
 *   GET    /users/me/contacts
 *   POST   /users/me/contacts        { fullName, relationship, phone, email, notify }
 *   PATCH  /users/me/contacts/:id    { ...fields }
 *   DELETE /users/me/contacts/:id
 * And the actual notification trigger described in the role doc
 * ("Add the people you trust. They'll get a high-priority alert with
 * your location the second you need help") should be a backend
 * responsibility fired when a call/SOS event is created — Amazon SNS
 * per the AWS Services table — not something the frontend does
 * directly. This context only manages the *list* of who should be
 * notified; it doesn't send anything itself.
 */
const EmergencyContactsContext = createContext(null);

export function EmergencyContactsProvider({ children }) {
  const { currentUser } = useUserAuth();
  // Keyed by userId so each account has its own contact list:
  // { [userId]: Contact[] }
  const [contactsByUser, setContactsByUser] = useState({});

  const userId = currentUser?.id ?? null;
  const contacts = useMemo(
    () => contactsByUser[userId] ?? [],
    [contactsByUser, userId],
  );

  const addContact = useCallback(
    (contact) => {
      if (!userId) return;
      const newContact = {
        id: `contact-${Date.now()}`,
        fullName: contact.fullName?.trim() ?? "",
        relationship: contact.relationship?.trim() ?? "",
        phone: contact.phone?.trim() ?? "",
        email: contact.email?.trim() ?? "",
        notify: true,
        addedAt: Date.now(),
      };
      setContactsByUser((prev) => ({
        ...prev,
        [userId]: [...(prev[userId] ?? []), newContact],
      }));
    },
    [userId],
  );

  const updateContact = useCallback(
    (contactId, patch) => {
      if (!userId) return;
      setContactsByUser((prev) => ({
        ...prev,
        [userId]: (prev[userId] ?? []).map((c) =>
          c.id === contactId ? { ...c, ...patch } : c,
        ),
      }));
    },
    [userId],
  );

  const removeContact = useCallback(
    (contactId) => {
      if (!userId) return;
      setContactsByUser((prev) => ({
        ...prev,
        [userId]: (prev[userId] ?? []).filter((c) => c.id !== contactId),
      }));
    },
    [userId],
  );

  const toggleNotify = useCallback(
    (contactId) => {
      if (!userId) return;
      setContactsByUser((prev) => ({
        ...prev,
        [userId]: (prev[userId] ?? []).map((c) =>
          c.id === contactId ? { ...c, notify: !c.notify } : c,
        ),
      }));
    },
    [userId],
  );

  const value = {
    contacts,
    addContact,
    updateContact,
    removeContact,
    toggleNotify,
  };

  return (
    <EmergencyContactsContext.Provider value={value}>
      {children}
    </EmergencyContactsContext.Provider>
  );
}

export function useEmergencyContacts() {
  const ctx = useContext(EmergencyContactsContext);
  if (!ctx) {
    throw new Error(
      "useEmergencyContacts must be used within an EmergencyContactsProvider",
    );
  }
  return ctx;
}
