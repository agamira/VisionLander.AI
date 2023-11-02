import { useState } from "react";
import { GlobalContext } from ".";
import {
  Button,
  CustomList,
  LoginForm,
  Modal,
  PricingCard,
  RegisterForm,
} from "../components";
import coin from "../assets/img/coin.png";
import { useDispatch } from "react-redux";
import { loginAsync, signupAsync } from "../redux/authSlice";

const GlobalProvider = ({ children }) => {
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const dispatch = useDispatch();

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
              logInAction={(data) => dispatch(loginAsync(data))}
              closeLogInModal={closeLogInModal}
              signUpAction={openSignUpModal}
            />
          </Modal>
        ) : null
      }
      {
        // Modal for Sign Up
        isSignUpModalOpen ? (
          <Modal isOpen={isSignUpModalOpen} closeModal={closeSignUpModal}>
            <RegisterForm
              signUpAction={(data) => dispatch(signupAsync(data))}
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
