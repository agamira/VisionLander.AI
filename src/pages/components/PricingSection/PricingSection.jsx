import "./PricingSection.scss";
import { CustomList, PricingCard } from "../../../components";
import coin from "../../../assets/img/coin.png";
import { Button } from "../../../components";
import { api } from "../../../api";
import { closeModalByName } from "../../../utils/modalUtils";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { useEffect, useState } from "react";

const PricingSection = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [yearly, setYearly] = useState(false);
  const [priceList, setPriceList] = useState(null);

  const freeFeatures = [
    "Limited projects",
    "Limited generations",
    "Includes 1 page hosting",
    "Simple editor",
    "4 free templates",
    "Paid feature",
  ];

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

  function toggleYearly() {
    setYearly((prev) => !prev);
  }

  useEffect(() => {
    api
      .get(`/get-price/${yearly ? "yearly" : "monthly"}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [yearly]);

  return (
    <section className="pricing-section" id="pricing">
      {contextHolder}
      <div className="container">
        <div className="pricing-title">
          <h2>Pricing</h2>
        </div>
        <div className="pricing-content">
          <div className="pricing-card-list">
            <PricingCard
              cardTitle={"Free plan"}
              cardImage={coin}
              planLimits={["to 20 wesites"]}
              planFeatures={<CustomList items={freeFeatures} />}
              cardFooter={
                <Button
                  style={{ padding: "0", display: "grid" }}
                  className="btn--pricing"
                >
                  <a
                    style={{ color: "#fff", padding: "24px 60px" }}
                    href="#generator"
                  >
                    Start Free
                  </a>
                </Button>
              }
            />
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
          </div>
        </div>
      </div>
    </section>
  );
};

export { PricingSection };
