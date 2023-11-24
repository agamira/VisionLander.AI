import "./Header.scss";
import burgerMenuIcon from "../../assets/icon/burger-menu.svg";
import { Button, Logo } from "../../components";
import { Dropdown, Space, message } from "antd";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../../redux/authSlice";
import { useState } from "react";
import { openModalByName } from "../../utils/modalUtils";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const items = [
    {
      label: <a onClick={() => navigate("/dashboard")}>Dashboard</a>,
      key: "0",
    },
    {
      label: <a onClick={() => handleLogOut()}>Log Out</a>,
      key: "1",
    },
  ];

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
                    <li>
                      <a href="#pricing">Pricing</a>
                    </li>
                    <li>
                      <a href="#testimonials">Testimonials</a>
                    </li>
                  </ul>
                </nav>
                <div className="header-buttons">
                  {!loggedUser?.email ? (
                    <>
                      <Button
                        onClick={() => openModalByName(dispatch, "loginModal")}
                        className="btn"
                      >
                        Log In
                      </Button>
                      <Button
                        onClick={() =>
                          openModalByName(dispatch, "registerModal")
                        }
                        className={"btn--outline"}
                      >
                        Sign Up
                      </Button>
                    </>
                  ) : (
                    <>
                      <Dropdown
                        menu={{
                          items,
                        }}
                        placement="bottom"
                        arrow
                      >
                        <a
                          className="btn btn--outline"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => e.preventDefault()}
                        >
                          <Space>
                            {loggedUser.email}
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>
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
