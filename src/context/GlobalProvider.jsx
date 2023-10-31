import { useState, useEffect } from "react";
import { GlobalContext } from ".";
import { auth, login, register } from "../api";
import {
  Button,
  CustomList,
  LoginForm,
  Modal,
  PricingCard,
  RegisterForm,
} from "../components";
import coin from "../assets/img/coin.png";

const GlobalProvider = ({ children }) => {
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

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

  const openPricingModal = () => {
    setIsPricingModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePricingModal = () => {
    setIsPricingModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const [loggedUser, setLoggedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth()
      .then((res) => {
        if (res.status === 200) {
          setLoggedUser(res);
          setIsLoading(false);
        }
        if (res.status === 404) {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [setLoggedUser]);

  const proFeatures = [
    "Unlimited projects",
    "Unlimited generations",
    "Includes 1 page hosting and advanced editor",
    "Private community",
    "Choose next features",
    "Access them early",
  ];

  return (
    <GlobalContext.Provider
      value={{
        isLogInModalOpen,
        isSignUpModalOpen,
        openLogInModal,
        closeLogInModal,
        openSignUpModal,
        closeSignUpModal,
        loggedUser,
        setLoggedUser,
        isLoading,
        setIsLoading,
        isPricingModalOpen,
        openPricingModal,
        closePricingModal,
      }}
    >
      {
        // Modal for Log In
        isLogInModalOpen ? (
          <Modal isOpen={isLogInModalOpen} closeModal={closeLogInModal}>
            <LoginForm
              logInAction={login}
              closeLogInModal={closeLogInModal}
              signUpAction={openSignUpModal}
              setLoggedUser={setLoggedUser}
            />
          </Modal>
        ) : null
      }
      {
        // Modal for Sign Up
        isSignUpModalOpen ? (
          <Modal isOpen={isSignUpModalOpen} closeModal={closeSignUpModal}>
            <RegisterForm
              signUpAction={register}
              closeSignUpModal={closeSignUpModal}
              logInAction={openLogInModal}
            />
          </Modal>
        ) : null
      }
      {
        // Modal for Sign Up
        isPricingModalOpen ? (
          <Modal isOpen={isPricingModalOpen} closeModal={closePricingModal}>
            <PricingCard
              cardTitle={"Pro plan"}
              cardImage={coin}
              planPrice={19}
              planLimits={["20 000 words", "10 reports"]}
              planFeatures={<CustomList className="pro" items={proFeatures} />}
              cardFooter={
                <Button
                  onClick={() => closePricingModal()}
                  className="btn--pricing"
                >
                  Upgrade
                </Button>
              }
            />
          </Modal>
        ) : null
      }
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider };
