import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TeamCard from "./TeamCard";
import styles from "./TeamFinder.module.css";
import { FaPlusCircle } from "react-icons/fa";

type Team = {
  teamID: string;
  teamName: string;
  teamTag: string;
  teamCountry: string | null;
  teamLanguage: string;
  teamUpdatedDateTime: string;
  teamLogo: string | null;
};

interface User {
  displayName: string;
  profilePicture: string;
  steamid: string;
  playerTeamOwner: string | null;
}

const TeamFinder = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamCount, setTeamCount] = useState<number | null>(null);
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [loadingTeamCount, setLoadingTeamCount] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<any>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const navigate = useNavigate();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchTeams = async (lastEvaluatedKey = null, append = false) => {
    setLoadingTeams(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/teams`,
        {
          params: {
            limit: 20,
            lastEvaluatedKey: lastEvaluatedKey
              ? JSON.stringify(lastEvaluatedKey)
              : undefined,
          },
        }
      );
      setTeams((prevTeams) =>
        append ? [...prevTeams, ...response.data.teams] : response.data.teams
      );
      setLastEvaluatedKey(response.data.lastEvaluatedKey);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoadingTeams(false);
      setIsFetchingMore(false);
    }
  };

  const fetchTeamCount = async () => {
    try {
      const response = await axios.get<{ count: number }>(
        `${import.meta.env.VITE_API_URL}/api/teams/count`
      );
      setTeamCount(response.data.count);
      setLoadingTeamCount(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setLoadingTeamCount(false);
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await axios.get<{ count: number }>(
        `${import.meta.env.VITE_API_URL}/api/players/count`
      );
      setPlayerCount(response.data.count);
      setLoadingPlayers(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setLoadingPlayers(false);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get<User>(
        `${import.meta.env.VITE_API_URL}/api/user`,
        { withCredentials: true }
      );
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchTeamCount();
    fetchPlayers();
    fetchUser();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && lastEvaluatedKey && !isFetchingMore) {
          setIsFetchingMore(true);
          fetchTeams(lastEvaluatedKey, true);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [lastEvaluatedKey, isFetchingMore]);

  return (
    <div className={styles.teamFinder}>
      <div className={styles.header}>
        <h1>CS2 Team Finder</h1>
        <h2>
          {loadingTeamCount || loadingPlayers
            ? ""
            : `(${teamCount} teams, ${playerCount} players)`}
        </h2>
      </div>
      {loadingTeams && !isFetchingMore ? (
        <p>Loading teams...</p>
      ) : error ? (
        <p>Error loading teams: {error}</p>
      ) : (
        <div className={styles.teamContainer}>
          {!loadingUser && !user?.playerTeamOwner && (
            <div
              className={styles.createTeamCard}
              onClick={() => navigate("/create")}
            >
              <FaPlusCircle className={styles.icon} />
              <span>Create a Team</span>
            </div>
          )}
          {teams.map((team) => (
            <TeamCard key={team.teamID} team={team} />
          ))}
          {lastEvaluatedKey && (
            <div ref={loadMoreRef} className={styles.loadMore}>
              {isFetchingMore ? "Loading more teams..." : ""}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamFinder;
