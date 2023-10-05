import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../layout";
import { useEffect, useState } from "react";
import { auth } from "../../api";

const Root = () => {
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  // Function to open the first modal and close the second
  const openLogInModal = () => {
    setIsSignUpModalOpen(false); // Close the second modal
    setIsLogInModalOpen(true); // Open the first modal
    document.body.style.overflow = "hidden";
  };

  // Function to close the first modal
  const closeLogInModal = () => {
    setIsLogInModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // Function to open the second modal and close the first
  const openSignUpModal = () => {
    setIsLogInModalOpen(false); // Close the first modal
    setIsSignUpModalOpen(true); // Open the second modal
    document.body.style.overflow = "hidden";
  };

  // Function to close the second modal
  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    auth()
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          setLoggedUser(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
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
