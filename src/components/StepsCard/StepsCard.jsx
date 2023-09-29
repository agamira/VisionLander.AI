import "./StepsCard.scss";
import circle from "../../assets/icon/circle.svg";
import arrow from "../../assets/icon/arrow.svg";

const StepsCard = ({
  className = "",
  cardNumber,
  cardTitle,
  cardImage,
  cardText,
  ...props
}) => {
  return (
    <div className={`steps-card ${className}`} {...props}>
      <div className="card-header">
        <div className="card-number">
          <img className="number-circle" src={circle} alt="" />
          <span className="number">{cardNumber}</span>
          <img className="card-arrow" src={arrow} alt="" />
        </div>
        <div className="card-title">
          <h5>{`Step ${cardNumber}: ${cardTitle}`}</h5>
        </div>
      </div>
      <div className="card-image">
        <img src={cardImage} alt="" />
      </div>
      <div className="card-text">
        <ul>
          <li>{cardText}</li>
        </ul>
      </div>
    </div>
  );
};

export { StepsCard };
