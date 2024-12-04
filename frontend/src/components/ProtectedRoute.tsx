import { Navigate } from "react-router";
import { useAuth } from "./AuthProvider";
import { ReactNode } from "react";

export const ProtectedRoute = ({children, redirectTo = "/login"} : { children : ReactNode, redirectTo : string}) => {
  const { user } = useAuth();

  if (user) {
    return children;
  } else {
    return <Navigate to={redirectTo} />;
  }
};