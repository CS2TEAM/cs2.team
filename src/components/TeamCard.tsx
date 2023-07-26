import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TeamCard.module.css";
import flagStyles from "./CountryFlag.module.css";
import { getCountryFlagClass } from "../utils/countryFlags";
import defaultImage from "../assets/images/default.webp";
import { FaRedo } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

type Team = {
  teamID: string;
  teamName: string;
  teamTag: string;
  teamCountry: string | null;
  teamLanguage: string;
  teamUpdatedDateTime: string;
  teamLogo: string | null;
  teamVerified?: boolean;
};

type TeamCardProps = {
  team: Team;
};

const timeSince = (date: string) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const { label, seconds: intervalSeconds } of intervals) {
    const interval = Math.floor(seconds / intervalSeconds);
    if (interval >= 1)
      return `${interval} ${label}${interval > 1 ? "s" : ""} ago`;
  }

  return "Just now";
};

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/team/${team.teamID}`);
  };

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = defaultImage;
  };

  return (
    <article className={styles.teamCard} onClick={handleCardClick}>
      <img
        src={team.teamLogo || defaultImage}
        alt={`${team.teamName} logo`}
        className={styles.image}
        onError={handleImageError}
      />
      <div className={styles.updateTime}>
        <FaRedo />
        {timeSince(team.teamUpdatedDateTime)}
      </div>
      <div className={styles.nameContainer}>
        <h3 className={styles.title}>{team.teamName}</h3>
        {team.teamVerified && (
          <FaCheckCircle className={styles.verifiedCheck} />
        )}
      </div>
      <div className={styles.infoContainer}>
        <div
          className={`${flagStyles.countryFlag} ${
            flagStyles[getCountryFlagClass(team.teamCountry)]
          }`}
        />
      </div>
    </article>
  );
};

export default TeamCard;
