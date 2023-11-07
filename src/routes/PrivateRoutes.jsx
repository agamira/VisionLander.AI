import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authAsync } from "../redux/authSlice";
import { Button, Result } from "antd";
import { Loading } from "../components";
import loadingIcon from "../assets/icon/loading.svg";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authAsync());
  }, [dispatch]);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isLoading ? (
    <Loading loadingIcon={loadingIcon} loadingMessage={"Loading redactor..."} />
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Result
      style={{ display: "flex", flexDirection: "column", height: "80vh" }}
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button onClick={() => navigate("/")} type="primary">
          Back Home
        </Button>
      }
    />
  );
};

export { PrivateRoutes };
