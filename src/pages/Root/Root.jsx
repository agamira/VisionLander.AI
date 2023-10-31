import { useContext } from "react";
import { GlobalContext } from "../../context";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../layout";
import { Loading } from "../../components";
import loadingIcon from "../../assets/icon/loading.svg";

const Root = () => {
  const {
    isLogInModalOpen,
    openLogInModal,
    closeLogInModal,
    isSignUpModalOpen,
    openSignUpModal,
    closeSignUpModal,
    loggedUser,
    setLoggedUser,
    isLoading,
  } = useContext(GlobalContext);

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
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
      />
      <Outlet context={[loggedUser, openLogInModal]} />
      <Footer />
    </>
  );
};

export { Root };
