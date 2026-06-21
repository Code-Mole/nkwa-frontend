import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, User, ShieldCheck, LogOut } from "lucide-react";
import { useUserAuth } from "../../context/UserAuthContext";

/**
 * ProfileDropdown — top-right account menu on the personal dashboard.
 * Shows the signed-in user's name/initial, and — only when
 * `currentUser.isAdmin` is true — a "Dispatcher Dashboard" link. That
 * link goes to /dashboard, which is still gated by the separate
 * dispatcher login (RequireAuth/AuthContext); this dropdown only
 * surfaces the link for admins, it doesn't grant access by itself.
 */
export default function ProfileDropdown() {
  const { currentUser, signOut } = useUserAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSignOut() {
    signOut();
    navigate("/", { replace: true });
  }

  if (!currentUser) return null;
  const initial = currentUser.name?.trim()?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full hover:bg-nkwa-50 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-nkwa-gradient text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
          {initial}
        </div>
        <span className="text-sm font-semibold text-ink-900 max-w-[120px] truncate">
          {currentUser.name}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-ink-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-card-lg border border-nkwa-100 py-2 z-50 animate-fade-in">
          <div className="px-4 py-2.5 border-b border-nkwa-100">
            <p className="text-sm font-semibold text-ink-900 truncate">
              {currentUser.name}
            </p>
            <p className="text-xs text-ink-400 truncate">{currentUser.email}</p>
          </div>

          <Link
            to="/my/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-700 hover:bg-nkwa-50 transition-colors"
          >
            <User className="w-4 h-4 text-ink-400" />
            My profile
          </Link>

          {currentUser.isAdmin && (
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-nkwa-700 font-medium hover:bg-nkwa-50 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-nkwa-500" />
              Dispatcher Dashboard
            </Link>
          )}

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-severity-critical hover:bg-severity-criticalBg transition-colors border-t border-nkwa-100 mt-1"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
