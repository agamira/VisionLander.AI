import "./Header.scss";
import { Button, Logo } from "../../components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header id="header">
      <div className="container">
        <div className="header-elements">
          <Logo />
          <nav>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              {/* <li>
                <a href="">Features</a>
              </li>
              <li>
                <a href="">Pricing</a>
              </li> */}
              <li>
                <a href="#how-it-works">How it works</a>
              </li>
              <li>
                <a href="#">Testimonials</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </nav>
          <div className="header-buttons">
            <Link to={"login"} className="btn">
              Log In
            </Link>
            <Button className={"btn--outline"}>Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
