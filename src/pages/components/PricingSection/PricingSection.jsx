import "./PricingSection.scss";
import { CustomList, PricingCard } from "../../../components";
import coin from "../../../assets/img/coin.png";
import { Button } from "../../../components";
import { api } from "../../../api";
import { closeModalByName } from "../../../utils/modalUtils";
import { useDispatch, useSelector } from "react-redux";
import { message, Segmented } from "antd";
import { useEffect, useState } from "react";
import { fetchPricing } from "../../../redux/pricingSlice";

const PricingSection = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [yearly, setYearly] = useState(false);
  const plan = useSelector((state) => state.pricing.plan);

  console.log(plan);

  const freeFeatures = [
    "Limited projects",
    "Limited generations",
    "Includes 1 page hosting",
    "Simple editor",
    "4 free templates",
    "Paid feature",
  ];

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  function handlePurchase(plan, period) {
    api
      .get(`/payment/${plan}/${period}`)
      .then((res) => {
        window.location.href = res.data.url;
        closeModalByName(dispatch, "pricingModal");
      })
      .catch((err) => {
        // error(err.response.statusText);
        console.log(err);
        if (err.response.status === 401) error("Please log in before payment");
      });
  }

  function toggleYearly() {
    setYearly((prev) => !prev);
  }

  useEffect(() => {
    dispatch(fetchPricing(yearly));
  }, [dispatch, yearly]);

  return (
    <section className="pricing-section" id="pricing">
      {contextHolder}
      <div className="container">
        <div className="pricing-title">
          <h2>Pricing</h2>
        </div>
        <div className="pricing-content">
          <Segmented
            className="pricing-switch"
            onChange={toggleYearly}
            options={["Monthly", "Yearly"]}
          />
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
              cardTitle={`${plan?.plan} plan`}
              cardImage={coin}
              planPrice={plan?.price}
              planCurrency={plan?.currency}
              planLimits={["20 000 words", "10 reports"]}
              planFeatures={
                <CustomList className="pro" items={plan?.features} />
              }
              cardFooter={
                <Button
                  onClick={() => handlePurchase(plan?.plan, plan?.period)}
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
