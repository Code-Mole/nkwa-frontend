import { Eye, Radio, AlertTriangle, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../../context/DashboardContext";
import { useAuth } from "../../context/AuthContext";

/**
 * DashboardShell — overall desktop layout: a slim purple sidebar (echoes
 * the mobile app's brand colour without literally reusing the mobile
 * bottom-nav pattern, which doesn't translate to a wide desktop screen)
 * plus a content area passed in as children.
 */
export default function DashboardShell({ children }) {
  const { activeCalls, prankCalls } = useDashboard();
  const { dispatcher, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-screen bg-surface flex">
      <aside className="w-20 bg-nkwa-gradient flex flex-col items-center py-6 flex-shrink-0">
        <div
          className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-1"
          title={dispatcher?.name ?? "Dispatcher"}
        >
          <Eye className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <p className="text-white/50 text-[10px] font-medium mb-7 max-w-[64px] text-center truncate">
          {dispatcher?.name ?? "Dispatcher"}
        </p>

        <nav className="flex flex-col items-center gap-2">
          <SidebarIcon
            icon={Radio}
            label="Live calls"
            active
            count={activeCalls.length}
          />
          <SidebarIcon
            icon={AlertTriangle}
            label="Prank queue"
            count={prankCalls.length}
          />
        </nav>

        <div className="mt-auto flex flex-col items-center gap-2">
          <SidebarIcon icon={Settings} label="Settings" />
          <SidebarIcon icon={LogOut} label="Sign out" onClick={handleLogout} />
        </div>
      </aside>

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

function SidebarIcon({ icon: Icon, label, active = false, count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={[
        "relative w-11 h-11 rounded-xl flex items-center justify-center transition-colors",
        active
          ? "bg-white text-nkwa-600"
          : "text-white/70 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      <Icon className="w-5 h-5" strokeWidth={2.25} />
      {typeof count === "number" && count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-severity-critical text-white text-[10px] font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
