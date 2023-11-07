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
  const loggedUser = useSelector((state) => state.auth.user);

  return !isLoading ? loggedUser?.email ? <Outlet /> : navigate("/") : null;
};

export { PrivateRoutes };
