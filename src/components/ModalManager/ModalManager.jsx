import {
  Button,
  CustomList,
  LoginForm,
  Modal,
  PricingCard,
  RegisterForm,
} from "../";
import coin from "../../assets/img/coin.png";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, signupAsync } from "../../redux/authSlice";
import { closeModalByName, openModalByName } from "../../utils/modalUtils";

const ModalManager = () => {
  const dispatch = useDispatch();
  const modals = useSelector((state) => state.modals.modals);

  const proFeatures = [
    "Unlimited projects",
    "Unlimited generations",
    "Includes 1 page hosting and advanced editor",
    "Private community",
    "Choose next features",
    "Access them early",
  ];

  return (
    <>
      {
        // Modal for Log In
        modals.loginModal ? (
          <Modal
            isOpen={modals.loginModal}
            closeModal={() => closeModalByName(dispatch, "loginModal")}
          >
            <LoginForm
              logInAction={(data) => dispatch(loginAsync(data))}
              closeLogInModal={() => closeModalByName(dispatch, "loginModal")}
              signUpAction={() => openModalByName(dispatch, "registerModal")}
            />
          </Modal>
        ) : null
      }
      {
        // Modal for Sign Up
        modals.registerModal ? (
          <Modal
            isOpen={modals.registerModal}
            closeModal={() => closeModalByName(dispatch, "registerModal")}
          >
            <RegisterForm
              signUpAction={(data) => dispatch(signupAsync(data))}
              closeSignUpModal={() =>
                closeModalByName(dispatch, "registerModal")
              }
              logInAction={() => openModalByName(dispatch, "loginModal")}
            />
          </Modal>
        ) : null
      }
      {
        // Modal for Pricing
        modals.pricingModal ? (
          <Modal
            isOpen={modals.pricingModal}
            closeModal={() => closeModalByName(dispatch, "pricingModal")}
          >
            <PricingCard
              cardTitle={"Pro plan"}
              cardImage={coin}
              planPrice={19}
              planLimits={["20 000 words", "10 reports"]}
              planFeatures={<CustomList className="pro" items={proFeatures} />}
              cardFooter={
                <Button
                  onClick={() => closeModalByName(dispatch, "pricingModal")}
                  className="btn--pricing"
                >
                  Upgrade
                </Button>
              }
            />
          </Modal>
        ) : null
      }
    </>
  );
};

export { ModalManager };
