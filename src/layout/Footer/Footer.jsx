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
                  <a target="_blank" rel="noreferrer" href="">
                    <img src={fb} alt="facebook" />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/agamiraai"
                  >
                    <img src={twitter} alt="twitter" />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.instagram.com/agamiraai/"
                  >
                    <img src={instagram} alt="instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-pages-list">
            <ul className="footer-unordered-list">
              <li className="first">Company</li>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#how-it-works">How it works</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#testimonials">Testimonials</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
