import { NavLink } from "react-router-dom";
import "./Footer.scss";
import ROUTES from "../../config/routes";
import { GithubIcon, LinkedInIcon, EmailIcon } from "../common/SocialIcons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container container">
        {/* Footer Top Section */}
        <div className="footer__top">
          {/* Company Info */}
          <div className="footer__section footer__about">
            <div className="footer__logo">
              <span className="logo-icon">🛒</span>
              <span className="logo-text">ShopEase</span>
            </div>
            <p className="footer__description">
              Your one-stop destination for all your shopping needs. Quality
              products at unbeatable prices.
            </p>
          </div>

          {/* Contact Links */}
          <div className="footer__section">
            <h3 className="footer__title">Contact Links</h3>
            <div className="footer__social">
              <a
                href="https://github.com/rudra-bt49"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
              </a>

              <a
                href="https://www.linkedin.com/in/rudra-patel-4b089b271"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </a>

              <a
                href="mailto:rudra0405@gmail.com"
                className="social-link"
              >
                <EmailIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h3 className="footer__title">Quick Links</h3>
            <ul className="footer__links">
              <li>
                <NavLink to={ROUTES.PRODUCTS} end>
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to={ROUTES.CART}>Cart</NavLink>
              </li>
              <li>
                <NavLink to={ROUTES.PRIVACY}>Privacy Policy</NavLink>
              </li>
              <li>
                <NavLink to={ROUTES.TERMS}>Terms & Conditions</NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} ShopEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;