import {
  Button,
  CustomList,
  LoginForm,
  Modal,
  PricingCard,
  RegisterForm,
} from "../";
import { Modal as AntdModal, Input, Tabs } from "antd";
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
  const loggedUser = useSelector((state) => state.auth.user);
  const modals = useSelector((state) => state.modals.modals);
  const [inputValue, setInputValue] = useState("");
  const [input2Value, setInput2Value] = useState("");
  const [activeTab, setActiveTab] = useState("freeDomain");
  const [siteId, setSiteId] = useState("");

  const proFeatures = [
    "Unlimited projects",
    "Unlimited generations",
    "Includes 1 page hosting and advanced editor",
    "Private community",
    "Choose next features",
    "Access them early",
  ];

  function handlePurchase(plan) {
    api
      .get(`/payment/${plan}`)
      .then((res) => {
        window.location.href = res.data.url;
        closeModalByName(dispatch, "pricingModal");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleOk() {
    if (!(inputValue || input2Value)) return alert("Please fill the field!");
    if (activeTab === "freeDomain") {
      api
        .post(`/domain/free/`, { domain: inputValue, id: siteId })
        .then((res) => {
          console.log(res);
          dispatch(fetchSites(loggedUser.email));
          closeModalByName(dispatch, "buyDomainModal");
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    }
    if (activeTab === "customDomain") {
      api
        .post(`/domain/premium/`, { domain: input2Value, id: siteId })
        .then((res) => {
          const url = res.data.url;
          if (url) {
            closeModalByName(dispatch, "buyDomainModal");
            window.location.href = url;
          }
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    }
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
                    onChange={(e) => setInputValue(e.target.value.trim())}
                  />
                ),
              },
              {
                label: `Custom Domain`,
                key: "customDomain",
                children: (
                  <Input
                    value={input2Value}
                    onChange={(e) => setInput2Value(e.target.value.trim())}
                    allowClear
                    addonBefore="https://"
                    placeholder="mysite.com"
                  />
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
