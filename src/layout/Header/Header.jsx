import "./Header.scss";
import burgerMenuIcon from "../../assets/icon/burger-menu.svg";
import { Button, Logo } from "../../components";
import { message } from "antd";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../../redux/authSlice";
import { useState } from "react";

const Header = ({ openLogInModal, openSignUpModal }) => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const matches = useMediaQuery("(max-width: 767px)");

  const [burgerMenu, setBurgerMenu] = useState(!matches);

  const loggedUser = useSelector((state) => state.auth.user);

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  function handleLogOut() {
    dispatch(logoutAsync())
      .then((response) => {
        let res = response.payload;
        if (res.status === 200) {
          success(res.message);
        }
      })
      .catch((err) => {
        error(err.message);
        error("Something went wrong!");
      });
  }

  return (
    <>
      {contextHolder}
      <header id="header">
        <div className="container">
          <div className="header-elements">
            <div className="header-logo">
              <Logo />
              <Button
                className="burger-btn"
                onClick={() => setBurgerMenu((prev) => !prev)}
              >
                <img src={burgerMenuIcon} alt="burger-menu" />
              </Button>
            </div>
            {burgerMenu && (
              <div className="nav">
                <nav>
                  <ul>
                    <li>
                      <a href="#home">Home</a>
                    </li>
                    <li>
                      <a href="#how-it-works">How it works</a>
                    </li>
                    <li>
                      <a href="#faq">FAQ</a>
                    </li>
                    {/* <li>
                      <a href="#pricing">Pricing</a>
                    </li> */}
                    <li>
                      <a href="#testimonials">Testimonials</a>
                    </li>
                  </ul>
                </nav>
                <div className="header-buttons">
                  {!loggedUser ? (
                    <>
                      <Button onClick={openLogInModal} className="btn">
                        Log In
                      </Button>
                      <Button
                        onClick={openSignUpModal}
                        className={"btn--outline"}
                      >
                        Sign Up
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className={"btn"}>{loggedUser.email}</Button>
                      <Button
                        onClick={() => handleLogOut()}
                        className={"btn--outline"}
                      >
                        Log Out
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export { Header };
