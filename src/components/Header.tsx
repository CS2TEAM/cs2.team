import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Header.module.css";
import cs2TeamLogo from "../assets/cs2team-logo.png";
import { FaSearch, FaPlusCircle, FaUsers } from "react-icons/fa";
import SteamSignInButton from "./SteamSignInButton";

axios.defaults.withCredentials = true;

interface User {
  displayName: string;
  profilePicture: string;
  steamid: string;
  playerTeamOwner: string | null;
}

function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data && response.data.displayName) {
          setUser(response.data as User);
        } else {
          setUser(null);
        }
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let steamid = searchQuery;
      if (isNaN(Number(searchQuery))) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/resolveVanityUrl/${searchQuery}`
        );
        steamid = response.data.steamid;
      }
      navigate(`/player/${steamid}`);
    } catch (error) {
      console.error("Error resolving vanity URL:", error);
    }
  };

  return (
    <header>
      <nav className={`${!user ? styles.navNotLoggedIn : ""}`}>
        <div className={styles.logo}>
          <a href="/" className="logo">
            {loading ? (
              <div className={styles.loadingProfilePicture}></div>
            ) : (
              <img src={cs2TeamLogo} alt="CS2.TEAM Logo" />
            )}
          </a>
        </div>
        <div className={styles.searchBar}>
          {loading ? (
            <div className={styles.loadingSearchBar}></div>
          ) : (
            <form className={styles.searchForm} onSubmit={handleSearch}>
              <input
                type="text"
                id="search"
                name="search"
                pattern="^[a-zA-Z0-9]+([a-zA-Z0-9 ]*[a-zA-Z0-9])?$"
                title="Search should be 1-30 characters long and in a valid format."
                minLength={1}
                maxLength={30}
                placeholder="Search for players and teams"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
                spellCheck="false"
                required
              />
              <button type="submit">
                <FaSearch />
              </button>
            </form>
          )}
        </div>
        {loading ? (
          <div className={styles.loadingProfilePicture}></div>
        ) : user ? (
          <div className={styles.userActions}>
            {!user.playerTeamOwner && (
              <a href="/create" className={styles.addCircle}>
                <FaPlusCircle />
              </a>
            )}
            {user.playerTeamOwner ? (
              <a
                href={`/team/${user.playerTeamOwner}`}
                className={styles.addCircle}
              >
                <FaUsers />
              </a>
            ) : (
              <a href="/" className={styles.addCircle}>
                <FaUsers />
              </a>
            )}
            <a href={`/player/${user.steamid}`} className={styles.userProfile}>
              <img
                src={user.profilePicture}
                alt={`${user.displayName}'s Profile`}
                className={styles.profilePicture}
              />
            </a>
          </div>
        ) : (
          <SteamSignInButton />
        )}
      </nav>
    </header>
  );
}

export default Header;
