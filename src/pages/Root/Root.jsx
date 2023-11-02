import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../layout";
import { Loading } from "../../components";
import loadingIcon from "../../assets/icon/loading.svg";
import { useDispatch, useSelector } from "react-redux";
import { authAsync } from "../../redux/authSlice";

const Root = () => {
  const {
    isLogInModalOpen,
    openLogInModal,
    closeLogInModal,
    isSignUpModalOpen,
    openSignUpModal,
    closeSignUpModal,
  } = useContext(GlobalContext);

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.isLoading);
  const loggedUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(authAsync());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loading loadingIcon={loadingIcon} />}
      <Header
        isLogInModalOpen={isLogInModalOpen}
        openLogInModal={openLogInModal}
        closeLogInModal={closeLogInModal}
        isSignUpModalOpen={isSignUpModalOpen}
        openSignUpModal={openSignUpModal}
        closeSignUpModal={closeSignUpModal}
      />
      <Outlet context={[loggedUser, openLogInModal]} />
      <Footer />
    </>
  );
};

export { Root };
