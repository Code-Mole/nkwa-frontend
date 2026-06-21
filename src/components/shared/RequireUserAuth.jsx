import { Navigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

/**
 * RequireUserAuth — wraps the personal dashboard route. Distinct from
 * RequireAuth.jsx (which guards the dispatcher dashboard) since these
 * are two separate sign-in systems — see UserAuthContext.jsx for why.
 * Redirects to /sign-in and remembers where the user was headed.
 */
export default function RequireUserAuth({ children }) {
  const { isAuthenticated } = useUserAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
}
