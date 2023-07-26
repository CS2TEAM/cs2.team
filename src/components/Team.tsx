import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./Profile.module.css";
import flagStyles from "./CountryFlag.module.css";
import { getCountryFlagClass } from "../utils/countryFlags";
import ProfileAbout from "./ProfileAbout";
import Socials from "./Socials";
import { FaCheckCircle } from "react-icons/fa";

type Team = {
  teamName: string;
  teamTag: string;
  teamCountry?: string;
  teamLanguage: string;
  teamPrivate: boolean;
  teamOwner: string;
  ownerUsername: string;
  teamCreatedDateTime: string;
  teamUpdatedDateTime: string;
  teamAbout?: string;
  teamVerified?: boolean;
};

interface User {
  displayName: string;
  profilePicture: string;
  steamid: string;
}

function Team() {
  const { teamID } = useParams<{ teamID: string }>();
  const [team, setTeam] = useState<Team | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canBump, setCanBump] = useState<boolean>(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/team/${teamID}`
        );
        const teamData = response.data;
        setTeam(teamData);

        const lastUpdated = new Date(teamData.teamUpdatedDateTime);
        const now = new Date();
        const timeDiff = now.getTime() - lastUpdated.getTime();

        if (timeDiff >= 24 * 60 * 60 * 1000) {
          setCanBump(true);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response ? error.response.data : "Error fetching team data"
          );
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamID]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user`,
          {
            withCredentials: true,
          }
        );
        if (response.data && response.data.displayName) {
          setUser(response.data as User);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (team) {
      document.title = `${team.teamName} - Team - CS2.TEAM`;
    }
  }, [team]);

  const handleBumpTeam = async () => {
    if (!team || !canBump) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/team/${teamID}/bump`
      );
      const now = new Date();
      setTeam({ ...team, teamUpdatedDateTime: now.toISOString() });
      setCanBump(false);
    } catch (error) {
      setError("Error bumping the team. Please try again later.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.username}>
        <h1>{team.teamName}</h1>
        {team.teamVerified && (
          <FaCheckCircle className={styles.verifiedCheck} />
        )}
      </div>
      <p>[{team.teamTag}]</p>
      {team.teamCountry && (
        <span
          className={
            flagStyles.countryFlag +
            " " +
            flagStyles[getCountryFlagClass(team.teamCountry)]
          }
        ></span>
      )}
      <p>{team.teamLanguage}</p>
      <p>
        Owner:{" "}
        <Link to={`/player/${team.teamOwner}`}>{team.ownerUsername}</Link>
      </p>
      <p>
        Created on{" "}
        {team.teamCreatedDateTime
          ? new Date(team.teamCreatedDateTime).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "unknown"}
      </p>
      {user && user.steamid === team.teamOwner && canBump && (
        <div>
          <button onClick={handleBumpTeam}>Bump Team</button>
        </div>
      )}
      <form>
        <fieldset>
          <ProfileAbout
            type="team"
            user={user}
            teamID={teamID}
            teamOwner={team.teamOwner}
          />
          <Socials type="team" user={user} id={teamID || ""} />
        </fieldset>
      </form>
    </div>
  );
}

export default Team;
