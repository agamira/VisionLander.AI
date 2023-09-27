import "./Logo.scss";
import logo from "../../assets/icon/logo.svg";

const Logo = () => {
  return (
    <div className="site-logo">
      <img src={logo} alt="logo" />
      <span>VisionLander.AI</span>
    </div>
  );
};

export { Logo };
