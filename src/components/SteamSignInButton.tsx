import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSteam } from "@fortawesome/free-brands-svg-icons";
import styles from "./Header.module.css";
import axios from "axios";

const SteamSignInButton: React.FC = () => {
  const handleSignInClick = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/healthcheck`);
      window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/steam`;
    } catch (error) {
      console.error("Error during sign-in", error);
    }
  };

  return (
    <button
      type="button"
      id="sign-in"
      className={styles.signIn}
      onClick={handleSignInClick}
    >
      <span>
        <FontAwesomeIcon icon={faSteam} />
        Sign In
      </span>
    </button>
  );
};

export default SteamSignInButton;
