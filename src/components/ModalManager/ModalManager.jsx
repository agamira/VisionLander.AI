import {
  Button,
  CustomList,
  LoginForm,
  Modal,
  PricingCard,
  RegisterForm,
} from "../";
import { Modal as AntdModal, Input, Tabs, message, Alert } from "antd";
import coin from "../../assets/img/coin.png";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../redux/authSlice";
import { closeModalByName, openModalByName } from "../../utils/modalUtils";
import { api, register } from "../../api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchSites } from "../../redux/sitesSlice";

const ModalManager = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const loggedUser = useSelector((state) => state.auth.user);
  const modals = useSelector((state) => state.modals.modals);
  const [inputValue, setInputValue] = useState("");
  const [input2Value, setInput2Value] = useState("");
  const [activeTab, setActiveTab] = useState("freeDomain");
  const [siteId, setSiteId] = useState("");
  const [email, setEmail] = useState("");

  const proFeatures = [
    "Unlimited projects",
    "Unlimited generations",
    "Includes 1 page hosting and advanced editor",
    "Private community",
    "Choose next features",
    "Access them early",
  ];

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
    });
  };

  function handlePurchase(plan) {
    api
      .get(`/payment/${plan}`)
      .then((res) => {
        window.location.href = res.data.url;
        closeModalByName(dispatch, "pricingModal");
      })
      .catch((err) => {
        error(err.response.statusText);
      });
  }

  function handleOk() {
    if (!(inputValue || input2Value)) return warning("Please fill the field!");
    if (activeTab === "freeDomain") {
      // Regular expression pattern for subdomain validation
      const subdomainRegex =
        /^([a-zA-Z0-9]([-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)?([a-zA-Z0-9]{1,2}([-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?)\.?([a-zA-Z]{2,63})?$/;

      // Validate subdomain using the regex pattern
      if (!subdomainRegex.test(inputValue)) {
        return warning("Please enter a valid subdomain!");
      }
      api
        .post(`/domain/free/`, { domain: inputValue, id: siteId })
        .then(() => {
          success("Domain successfully added!");
          dispatch(fetchSites(loggedUser.email));
          setInputValue("");
          closeModalByName(dispatch, "buyDomainModal");
        })
        .catch((err) => {
          if (err.response.status === 400) {
            error(err.response.statusText);
          }
          if (err.response.status === 402) {
            openModalByName(dispatch, "pricingModal");
          }
          if (err.response.status === 406) {
            error("Domain already exists!");
          }
        });
    }
    if (activeTab === "customDomain") {
      // Regular expression pattern for subdomain validation
      const subdomainRegex =
        /^([a-zA-Z0-9]([-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)?([a-zA-Z0-9]{1,2}([-a-zA-Z0-9]{0,252}[a-zA-Z0-9])?)\.([a-zA-Z]{2,63})$/;

      // Validate subdomain using the regex pattern
      if (!subdomainRegex.test(input2Value)) {
        return warning("Please enter a valid subdomain!");
      }
      api
        .post(`/domain/premium/`, { domain: input2Value, id: siteId })
        .then((res) => {
          const url = res.data.url;
          if (url) {
            setInput2Value("");
            closeModalByName(dispatch, "buyDomainModal");
            window.location.href = url;
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            error(err.response.statusText);
          }
          if (err.response.status === 402) {
            openModalByName(dispatch, "pricingModal");
          }
          if (err.response.status === 406) {
            error("Domain already exists!");
          }
        });
    }
  }

  function handleForgotPassword(email) {
    api
      .post(`/password/reset`, { email })
      .then(() => {
        setEmail("");
        success("Check your email for further instructions!");
        openModalByName(dispatch, "loginModal");
      })
      .catch((err) => {
        error(err.response.statusText);
      });
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    // Loop through all query parameters
    for (const param of searchParams.entries()) {
      setSiteId(param[0]);
    }
  }, [location.search]);

  return (
    <>
      {contextHolder}
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
              signUpAction={register}
              closeSignUpModal={() =>
                closeModalByName(dispatch, "registerModal")
              }
              logInAction={() => openModalByName(dispatch, "loginModal")}
            />
          </Modal>
        ) : null
      }
      {
        // Modal for Forgot Password
        <AntdModal
          title="Forgot Password"
          open={modals.forgotPasswordModal}
          onOk={() => handleForgotPassword(email)}
          keyboard={true}
          onCancel={() => {
            setEmail("");
            closeModalByName(dispatch, "forgotPasswordModal");
          }}
        >
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </AntdModal>
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
                  onClick={() => handlePurchase("premium")}
                  className="btn--pricing"
                >
                  Upgrade
                </Button>
              }
            />
          </Modal>
        ) : null
      }
      {
        <AntdModal
          title="Search for domain"
          open={modals.buyDomainModal}
          onOk={handleOk}
          keyboard={true}
          onCancel={() => closeModalByName(dispatch, "buyDomainModal")}
        >
          <Tabs
            defaultActiveKey="1"
            centered
            onTabClick={(key) => setActiveTab(key)}
            items={[
              {
                label: `Free Domain`,
                key: "freeDomain",
                children: (
                  <Input
                    addonBefore="https://"
                    addonAfter=".visionlander.ai"
                    placeholder="mysite"
                    allowClear
                    value={inputValue}
                    onChange={(e) =>
                      setInputValue(e.target.value.trim().toLowerCase())
                    }
                  />
                ),
              },
              !loggedUser?.premium
                ? null
                : {
                    label: `Custom Domain`,
                    key: "customDomain",
                    children: (
                      <>
                        <Input
                          value={input2Value}
                          onChange={(e) =>
                            setInput2Value(e.target.value.trim().toLowerCase())
                          }
                          allowClear
                          addonBefore="https://"
                          placeholder="mysite.com"
                          style={{ marginBottom: "0.8rem" }}
                        />
                        <Alert
                          message="Domain Registration"
                          description="Domain registration takes some time and it will be available in at least an hour!"
                          type="warning"
                          showIcon
                        />
                      </>
                    ),
                  },
            ]}
          />
        </AntdModal>
      }
      {children}
    </>
  );
};

export { ModalManager };
