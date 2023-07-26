import { useEffect } from "react";
import cs2TeamLogo from "../assets/cs2team-logo.png";
import samHillier from "../assets/images/sam-hillier.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faLinkedin,
  faGithub,
  faDiscord,
  faSteam,
} from "@fortawesome/free-brands-svg-icons";

const About = () => {
  useEffect(() => {
    document.title = "CS2.TEAM - Find Esports Teams and Players";
  }, []);
  return (
    <section>
      <section>
        <img src={cs2TeamLogo} alt="CS2.TEAM Logo" width="200px" />
        <h1>CS2.TEAM</h1>
        <p>Find esports TEAMS and PLAYERS on CS2.TEAM.</p>
        <h2>Our Mission</h2>
        <p>
          At CS2.TEAM, our mission is to connect aspiring players with esports
          teams. Whether you're a solo player searching for a squad or a team
          seeking new talent, our platform is designed to help you elevate your
          game to the next level.
        </p>
        <p>
          Founded on 22nd March, 2023, by Sam Hillier. CS2.TEAM emerged from the
          firsthand experience of recruiting players for the team Derby Esports,
          and the realisation of the need for a more streamlined and effective
          way to recruit players and manage a team.
        </p>
        <p>
          Esports should be for everyone, at all levels. Discovering esports
          teams has traditionally been limited to professional contenders in
          open qualifiers, making it near impossible for new teams to enter the
          esports scene.
        </p>
        <p>
          CS2.TEAM addresses these issues by offering a platform that enables
          teams and players of all levels to highlight themselves. Our
          matchmaking algorithm ensures high-quality matches and includes
          verification systems to guarantee the accuracy of skills and
          information provided by both teams and players.
        </p>
        <h2>Roadmap</h2>
        <section>
          <div>
            <span>✅</span>
            <p>Launch the alpha version of CS2.TEAM</p>
          </div>
          <div>
            <span>✅</span>
            <p>Rebrand of CS2.TEAM</p>
          </div>
          <div>
            <span>⌛</span>
            <p>Team and player profiles</p>
          </div>
          <div>
            <span>⌛</span>
            <p>Social networking features</p>
          </div>
          <div>
            <span>⌛</span>
            <p>Launch the beta version of CS2.TEAM</p>
          </div>
          <div>
            <span>⌛</span>
            <p>Team management and analysis tools</p>
          </div>
          <div>
            <span>⌛</span>
            <p>Advertise and build the community</p>
          </div>
          <div>
            <span>⌛</span>
            <p>Expand CS2.TEAM to other games</p>
          </div>
        </section>
        <h2>Meet the Team</h2>
        <section>
          <section>
            <img src={samHillier} alt="Sam Hillier" />
            <section>
              <h3>Sam Hillier</h3>
              <h4>Founder & CEO</h4>
              <p>
                Computer science graduate, full-stack developer and software
                engineer. Experience with esports team management and
                development.
              </p>
              <ul>
                <li>
                  <a
                    href="https://linkedin.com/in/samhillier/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Zyphaex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/Zyphaex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faXTwitter} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/Zyphaex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.com/invite/XfZHVfPr9C"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faDiscord} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://steamcommunity.com/id/Zyphaex/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faSteam} />
                  </a>
                </li>
              </ul>
            </section>
          </section>
        </section>
        <h2>Contact Us</h2>
        <p>
          We love to hear from our community! If you have any questions,
          suggestions, feedback, or are interested in working with us, feel free
          to reach out to us on our social media channels.
        </p>
      </section>
    </section>
  );
};

export default About;
