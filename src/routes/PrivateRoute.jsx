import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, redirectTo }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return <>{isAuthenticated ? children : <Navigate to={redirectTo} />}</>;
};

export { PrivateRoute };
