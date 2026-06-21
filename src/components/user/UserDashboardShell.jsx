import { NavLink } from "react-router-dom";
import { Eye, User, Users } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

/**
 * UserDashboardShell — top bar + tab navigation for the personal
 * dashboard, used by both /my/profile and /my/contacts. Tabbed at the
 * top level (Profile | Contacts) per the chosen layout, rather than a
 * sidebar — this is a much lighter-weight surface than the dispatcher
 * dashboard, so a sidebar would be disproportionate.
 */
export default function UserDashboardShell({ children }) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-white border-b border-nkwa-100">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-nkwa-600" strokeWidth={2.5} />
            <span className="font-bold text-ink-900">nkwa</span>
          </div>
          <ProfileDropdown />
        </div>

        <nav className="max-w-4xl mx-auto px-6 flex gap-1">
          <TabLink to="/my/profile" icon={User} label="Profile" />
          <TabLink to="/my/contacts" icon={Users} label="Emergency contacts" />
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}

function TabLink({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex items-center gap-1.5 px-4 py-3 text-sm font-semibold border-b-2 transition-colors -mb-px",
          isActive
            ? "border-nkwa-500 text-nkwa-600"
            : "border-transparent text-ink-400 hover:text-ink-600",
        ].join(" ")
      }
    >
      <Icon className="w-4 h-4" strokeWidth={2.25} />
      {label}
    </NavLink>
  );
}
