import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faFacebook,
  faYoutube,
  faLinkedin,
  faDiscord,
  faSteam,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/cs2team-logo.png";

type FooterInterface = {
  activePage?: string;
};

// Social Media Links
const socialMediaLinks = [
  { name: "X", url: "https://x.com/CS2TEAM", icon: faXTwitter },
  {
    name: "Instagram",
    url: "https://instagram.com/CS2TEAM",
    icon: faInstagram,
  },
  {
    name: "Facebook",
    url: "https://facebook.com/CS2TEAM",
    icon: faFacebook,
  },
  { name: "YouTube", url: "https://youtube.com/@CS2TEAM", icon: faYoutube },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/CS2TEAM",
    icon: faLinkedin,
  },
  {
    name: "Discord",
    url: "https://discord.com/invite/XfZHVfPr9C",
    icon: faDiscord,
  },
  {
    name: "Steam",
    url: "https://steamcommunity.com/groups/CS2TEAM",
    icon: faSteam,
  },
];

// Footer Links
const footerLinks = [
  { text: "About", page: "about" },
  { text: "Contact", page: "contact" },
  { text: "Terms & Conditions", page: "terms" },
  { text: "Privacy Policy", page: "privacy" },
];

const Footer = ({ activePage }: FooterInterface) => {
  const renderFooterLinks = () => {
    return (
      <ul className={styles.footerLinks} aria-label="Footer Navigation">
        {footerLinks.map((link) => (
          <li key={link.page}>
            <Link
              className={activePage === link.page ? styles.active : ""}
              to={`/${link.page}`}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  const renderSocialMediaLinks = () => {
    return (
      <ul className={styles.footerSocial} aria-label="Social Media Links">
        {socialMediaLinks.map((socialLink) => (
          <li key={socialLink.name}>
            <a
              href={socialLink.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialLink.name}
            >
              <FontAwesomeIcon icon={socialLink.icon} />
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <footer>
      <section className={styles.footerContainer}>
        <a className={styles.footerLogo} href="/">
          <img src={logo} alt="CS2.TEAM Logo" />
        </a>
        {renderFooterLinks()}
      </section>
      <section className={styles.footerContainer}>
        {renderSocialMediaLinks()}
        <p className={styles.footerLegal}>
          &copy; {new Date().getFullYear()} CS2.TEAM. All Rights Reserved.
          <br></br>
        </p>
      </section>
    </footer>
  );
};

export default Footer;
