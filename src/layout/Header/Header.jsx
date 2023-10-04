import "./Header.scss";
import { Button, LoginForm, Logo, Modal, RegisterForm } from "../../components";
import { login, register } from "../../api/auth";

const Header = ({
  isLoggedIn,
  setIsLoggedIn,
  isLogInModalOpen,
  openLogInModal,
  closeLogInModal,
  isSignUpModalOpen,
  openSignUpModal,
  closeSignUpModal,
}) => {
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
              <li>
                <a href="#how-it-works">How it works</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Testimonials</a>
              </li>
            </ul>
          </nav>
          <div className="header-buttons">
            {!isLoggedIn ? (
              <>
                <Button onClick={openLogInModal} className="btn">
                  Log In
                </Button>
                <Button onClick={openSignUpModal} className={"btn--outline"}>
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button className={"btn--outline"}>User</Button>
                <Button
                  onClick={() => setIsLoggedIn(false)}
                  className={"btn--outline"}
                >
                  Log Out
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      {
        // Modal for Log In
        isLogInModalOpen ? (
          <Modal isOpen={isLogInModalOpen} closeModal={closeLogInModal}>
            <LoginForm logInAction={login} signUpAction={openSignUpModal} />
          </Modal>
        ) : null
      }
      {
        // Modal for Sign Up
        isSignUpModalOpen ? (
          <Modal isOpen={isSignUpModalOpen} closeModal={closeSignUpModal}>
            <RegisterForm
              signUpAction={register}
              logInAction={openLogInModal}
            />
          </Modal>
        ) : null
      }
    </header>
  );
};

export { Header };
