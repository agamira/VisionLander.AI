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
    isLoggedIn,
    setIsLoggedIn,
    loggedUser,
    setLoggedUser,
    isLoading,
  }  = useContext(GlobalContext);

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
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
      />
      <Outlet context={[isLoggedIn, openLogInModal]} />
      <Footer />
    </>
  );
};

export { Root };
