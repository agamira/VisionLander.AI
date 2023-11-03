import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../layout";
import { Loading, ModalManager } from "../../components";
import loadingIcon from "../../assets/icon/loading.svg";
import { useDispatch, useSelector } from "react-redux";
import { authAsync } from "../../redux/authSlice";

const Root = () => {
  // const {
  //   isLogInModalOpen,
  //   openLogInModal,
  //   closeLogInModal,
  //   isSignUpModalOpen,
  //   openSignUpModal,
  //   closeSignUpModal,
  // } = useContext(GlobalContext);

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    dispatch(authAsync());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loading loadingIcon={loadingIcon} />}
      <ModalManager />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export { Root };
