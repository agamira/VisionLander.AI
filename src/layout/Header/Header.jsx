import "./Header.scss";
import { Button, LoginForm, Logo, Modal, RegisterForm } from "../../components";
import { useState } from "react";

const Header = () => {
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
  return (
    <header id="header">
      <div className="container">
        <div className="header-elements">
          <Logo />
          <nav>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              {/* <li>
                <a href="">Features</a>
              </li>
              <li>
                <a href="">Pricing</a>
              </li> */}
              <li>
                <a href="#how-it-works">How it works</a>
              </li>
              <li>
                <a href="#">Testimonials</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </nav>
          <div className="header-buttons">
            <Button onClick={openLogInModal} className="btn">
              Log In
            </Button>
            <Button onClick={openSignUpModal} className={"btn--outline"}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      {isLogInModalOpen ? (
        <Modal isOpen={isLogInModalOpen} closeModal={closeLogInModal}>
          <LoginForm />
        </Modal>
      ) : null}
      {isSignUpModalOpen ? (
        <Modal isOpen={isSignUpModalOpen} closeModal={closeSignUpModal}>
          <RegisterForm />
        </Modal>
      ) : null}
    </header>
  );
};

export { Header };
