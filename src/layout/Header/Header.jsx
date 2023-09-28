import "./Header.scss";
import { NavLink } from "react-router-dom";
import { Button, Logo } from "../../components";

const Header = () => {
  return (
    <header id="header">
      <div className="container">
        <div className="header-elements">
          <Logo />
          <nav>
            <ul>
              <li>
                <NavLink href="">Home</NavLink>
              </li>
              <li>
                <NavLink href="">Features</NavLink>
              </li>
              <li>
                <NavLink href="">Pricing</NavLink>
              </li>
              <li>
                <NavLink href="">How it works</NavLink>
              </li>
              <li>
                <NavLink href="">Testimonials</NavLink>
              </li>
              <li>
                <NavLink href="">FAQ</NavLink>
              </li>
            </ul>
          </nav>
          <div className="header-buttons">
            <Button>Log In</Button>
            <Button className={"btn--outline"}>Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
