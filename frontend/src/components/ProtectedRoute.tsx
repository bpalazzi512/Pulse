import { useNavigate, Outlet, Navigate } from "react-router";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = ({ redirectTo = "/login"} : { redirectTo : string}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to={redirectTo} />;
  }
};