import "./Logo.scss";
import logo from "../../assets/icon/logo.svg";

const Logo = () => {
  return (
    <div className="site-logo">
      <a href="/">
        <img src={logo} alt="logo" />
        <span>VisionLander.AI</span>
      </a>
    </div>
  );
};

export { Logo };
