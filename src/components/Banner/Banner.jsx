import "./Banner.scss";
import rocket from "../../assets/icon/rocket.svg";

const Banner = ({ bannerBtnAction }) => {
  return (
    <div className="banner">
      <div className="banner__content">
        <div className="banner__text">
          <p>Upgrade to save your website and unlock premium features</p>
        </div>
        <div className="banner__btn">
          <button onClick={() => bannerBtnAction()}>
            <div className="btn-wrapper">
              <span className="btn-text">Buy premium</span>
              <span className="btn-img">
                <img src={rocket} alt="rocket-icon" />
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export { Banner };
