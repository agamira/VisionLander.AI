import "./PricingCard.scss";

const PricingCard = ({
  className = "",
  cardTitle,
  cardImage,
  planFeatures,
  cardFooter,
  planPrice,
  planLimits,
  planCurrency,
}) => {
  return (
    <div className={`pricing-card ${className}${planPrice > 0 ? " pro" : ""}`}>
      <div className="pricing-card__title">
        <h3>{cardTitle}</h3>
      </div>
      <div className="pricing-card__body">
        <div className="pricing-card__body__price">
          <div className="coin-image">
            <img src={cardImage} alt="coin" />
          </div>
          <div className="plan">
            <p className="plan-price">
              {!planPrice
                ? "Free website generation"
                : `${planPrice}${planCurrency}/month`}
            </p>
            {planLimits?.map((limit, index) => {
              return (
                <p className="plan-limits" key={index}>
                  {limit}
                </p>
              );
            })}
          </div>
        </div>
        <div className="pricing-card__body__features">{planFeatures}</div>
      </div>
      <div className="pricing-card__footer">{cardFooter}</div>
    </div>
  );
};

export { PricingCard };
