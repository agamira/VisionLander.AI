import "./Footer.scss";
import { Logo } from "../../components";
import fb from "../../assets/icon/fb.svg";
import twitter from "../../assets/icon/twitter.svg";
import instagram from "../../assets/icon/instagram.svg";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-copyright">
            <div className="footer-logo">
              <Logo />
              <p className="p">
                2023 Award winning Vaccination and Lorem ipsum dolor sit amet
              </p>
              <ul className="social-network-icons">
                <li>
                  <a href="">
                    <img src={fb} alt="facebook" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src={twitter} alt="twitter" />
                  </a>
                </li>
                <li>
                  <a href="">
                    <img src={instagram} alt="instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-pages-list">
            <ul className="footer-unordered-list">
              <li className="first">Location</li>
              <li>America</li>
              <li>Asia</li>
              <li>Europe</li>
              <li>Africa</li>
            </ul>
            <ul className="footer-unordered-list">
              <li className="first">Contact</li>
              <li>About Me</li>
              <li>Teams</li>
              <li>Profile</li>
              <li>FAQ</li>
            </ul>
            <ul className="footer-unordered-list">
              <li>Legals</li>
              <li>Privacy</li>
              <li>Disclaimer</li>
              <li>Terms</li>
              <li>Company</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
