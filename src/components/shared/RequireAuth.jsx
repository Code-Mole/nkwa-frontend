import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * RequireAuth — wraps any route that should be hidden from regular
 * users. Currently only used for /dashboard. Redirects to
 * /dispatcher-login and remembers where the dispatcher was headed so
 * they land back there after signing in.
 */
export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to="/dispatcher-login" state={{ from: location }} replace />
    );
  }

  return children;
}
