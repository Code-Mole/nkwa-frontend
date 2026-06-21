import { useState, useEffect } from "react";
import { User, Mail, MapPin, Home, ShieldCheck, Check } from "lucide-react";
import UserDashboardShell from "../components/user/UserDashboardShell";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";
import { useUserAuth } from "../context/UserAuthContext";
import { useEmergencyContacts } from "../context/EmergencyContactsContext";

const REGIONS = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Eastern",
  "Central",
  "Volta",
  "Northern",
  "Bono",
];

/**
 * ProfilePage — "Personal profile" tab of the citizen dashboard.
 * Mirrors the mobile app's Settings screen (editable name, region,
 * home address) plus a quick-glance summary of the user's emergency
 * circle size, since that's the other half of what this dashboard is
 * for.
 */
export default function ProfilePage() {
  const { currentUser, updateProfile } = useUserAuth();
  const { contacts } = useEmergencyContacts();

  const [name, setName] = useState(currentUser?.name ?? "");
  const [region, setRegion] = useState(currentUser?.region ?? "");
  const [homeAddress, setHomeAddress] = useState(
    currentUser?.homeAddress ?? "",
  );
  const [saved, setSaved] = useState(false);

  // Keep local form state in sync if currentUser changes externally
  // (e.g. after a fresh sign-in).
  useEffect(() => {
    setName(currentUser?.name ?? "");
    setRegion(currentUser?.region ?? "");
    setHomeAddress(currentUser?.homeAddress ?? "");
  }, [currentUser?.id]);

  function handleSave(e) {
    e.preventDefault();
    updateProfile({
      name: name.trim(),
      region,
      homeAddress: homeAddress.trim(),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (!currentUser) return null;
  const notifyCount = contacts.filter((c) => c.notify).length;

  return (
    <UserDashboardShell>
      <div className="grid md:grid-cols-[1fr_280px] gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-5">
            <User className="w-4 h-4 text-nkwa-600" />
            <h2 className="font-bold text-ink-900">Personal profile</h2>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label
                htmlFor="profile-name"
                className="block text-sm font-medium text-ink-700 mb-1.5"
              >
                Full name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-nkwa-50 border border-transparent focus:border-nkwa-300 focus:bg-white outline-none text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={currentUser.email}
                  disabled
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-nkwa-50/50 border border-transparent text-sm text-ink-400 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-ink-400 mt-1">
                Email cannot be changed in this demo build.
              </p>
            </div>

            <div>
              <label
                htmlFor="profile-region"
                className="block text-sm font-medium text-ink-700 mb-1.5"
              >
                Region
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2 z-10" />
                <select
                  id="profile-region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-nkwa-50 border border-transparent focus:border-nkwa-300 focus:bg-white outline-none text-sm transition-colors appearance-none"
                >
                  <option value="">Select your region</option>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="profile-address"
                className="block text-sm font-medium text-ink-700 mb-1.5"
              >
                Home address
              </label>
              <div className="relative">
                <Home className="w-4 h-4 text-ink-300 absolute left-3.5 top-3.5" />
                <textarea
                  id="profile-address"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  placeholder="Street, neighbourhood, landmark…"
                  rows={2}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-nkwa-50 border border-transparent focus:border-nkwa-300 focus:bg-white outline-none text-sm transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <Button type="submit" variant="primary">
                Save changes
              </Button>
              {saved && (
                <span className="flex items-center gap-1.5 text-sm text-service-ambulance font-medium animate-fade-in">
                  <Check className="w-4 h-4" /> Saved
                </span>
              )}
            </div>
          </form>
        </Card>

        <div className="space-y-4">
          <Card>
            <p className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-1">
              Emergency circle
            </p>
            <p className="text-3xl font-bold text-ink-900">{contacts.length}</p>
            <p className="text-sm text-ink-500 mt-0.5">
              {notifyCount} will be notified on SOS
            </p>
          </Card>

          {currentUser.isAdmin && (
            <Card className="bg-nkwa-50 border border-nkwa-100">
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-nkwa-600" />
                <p className="text-sm font-semibold text-nkwa-700">
                  Dispatcher access
                </p>
              </div>
              <p className="text-xs text-ink-500">
                Your account has dispatcher privileges. Find the Dispatcher
                Dashboard link in your profile menu, top right.
              </p>
            </Card>
          )}
        </div>
      </div>
    </UserDashboardShell>
  );
}
