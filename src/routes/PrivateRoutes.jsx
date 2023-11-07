import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authAsync } from "../redux/authSlice";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authAsync());
  }, [dispatch]);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isLoading ? null : isAuthenticated ? <Outlet /> : navigate("/");
};

export { PrivateRoutes };
