import "./PricingSection.scss";
import { CustomList, PricingCard } from "../../../components";
import coin from "../../../assets/img/coin.png";
import { Button } from "../../../components";

const PricingSection = () => {
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

  return (
    <section className="pricing-section" id="pricing">
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
              cardFooter={<Button className="btn--pricing">Start Free</Button>}
            />
            <PricingCard
              cardTitle={"Pro plan"}
              cardImage={coin}
              planPrice={19}
              planLimits={["20 000 words", "10 reports"]}
              planFeatures={<CustomList className="pro" items={proFeatures} />}
              cardFooter={<Button className="btn--pricing">Upgrade</Button>}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { PricingSection };
