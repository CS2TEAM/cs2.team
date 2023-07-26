import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaReddit,
  FaSteam,
  FaTiktok,
  FaTwitch,
  FaTwitter,
  FaVk,
  FaWeibo,
  FaYoutube,
  FaKickstarterK,
  FaGlobe,
} from "react-icons/fa";

interface User {
  displayName: string;
  profilePicture: string;
  steamid: string;
}

interface SocialsProps {
  type: "player" | "team";
  user: User | null;
  id: string;
}

interface SocialField {
  id: string;
  name: string | undefined;
  label: string | undefined;
  type: "url" | "text";
  placeholder: string | undefined;
  minLength?: number;
  maxLength?: number;
  value: string | null;
  icon: JSX.Element;
  baseUrl?: string;
}

const InputField: React.FC<SocialField> = ({
  id,
  name,
  label,
  type,
  placeholder,
  minLength,
  maxLength,
  value,
}) => {
  if (!name || !label || !placeholder) return null;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        defaultValue={value || ""}
      />
    </div>
  );
};

const Socials: React.FC<SocialsProps> = ({ type, user, id }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [socialData, setSocialData] = useState<any>({});

  useEffect(() => {
    setIsEditMode(false);
  }, [id]);

  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        const endpoint =
          type === "player"
            ? `${import.meta.env.VITE_API_URL}/api/player/${id}`
            : `${import.meta.env.VITE_API_URL}/api/team/${id}`;

        const response = await axios.get(endpoint);
        const data = response.data;

        const mappedData =
          type === "player"
            ? data
            : {
                website: data.teamWebsite,
                x: data.teamX,
                instagram: data.teamInstagram,
                youtube: data.teamYouTube,
                twitch: data.teamTwitch,
                kick: data.teamKick,
                tiktok: data.teamTiktok,
                facebook: data.teamFacebook,
                linkedin: data.teamLinkedIn,
                github: data.teamGithub,
                reddit: data.teamReddit,
                steam: data.teamSteam,
                vk: data.teamVk,
                weibo: data.teamWeibo,
                teamOwner: data.teamOwner,
              };

        setSocialData(mappedData);
      } catch (error) {
        console.error(`Error fetching ${type} social data:`, error);
      }
    };

    fetchSocialData();
  }, [id, type]);

  const isPlayer = type === "player";

  const canEdit =
    user &&
    ((isPlayer && user.steamid === id) ||
      (!isPlayer && user.steamid === socialData.teamOwner));

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const allFields: SocialField[] = [
    {
      id: `${type}-website`,
      name: "website",
      label: "Website",
      type: "url",
      placeholder: "derbyesports.com",
      value: socialData.website,
      icon: <FaGlobe />,
      baseUrl: "",
    },
    {
      id: `${type}-x`,
      name: "x",
      label: "x.com/",
      type: "text",
      placeholder: "username",
      value: socialData.x,
      icon: <FaTwitter />,
      baseUrl: "https://x.com/",
    },
    {
      id: `${type}-instagram`,
      name: "instagram",
      label: "instagram.com/",
      type: "text",
      placeholder: "username",
      value: socialData.instagram,
      icon: <FaInstagram />,
      baseUrl: "https://instagram.com/",
    },
    {
      id: `${type}-youtube`,
      name: "youtube",
      label: "youtube.com/@",
      type: "text",
      placeholder: "username",
      value: socialData.youtube,
      icon: <FaYoutube />,
      baseUrl: "https://youtube.com/@",
    },
    {
      id: `${type}-twitch`,
      name: "twitch",
      label: "twitch.tv/",
      type: "text",
      placeholder: "username",
      value: socialData.twitch,
      icon: <FaTwitch />,
      baseUrl: "https://twitch.tv/",
    },
    {
      id: `${type}-kick`,
      name: "kick",
      label: "kick.com/",
      type: "text",
      placeholder: "username",
      value: socialData.kick,
      icon: <FaKickstarterK />,
      baseUrl: "https://kick.com/",
    },
    {
      id: `${type}-tiktok`,
      name: "tiktok",
      label: "tiktok.com/@",
      type: "text",
      placeholder: "username",
      value: socialData.tiktok,
      icon: <FaTiktok />,
      baseUrl: "https://tiktok.com/@",
    },
    {
      id: `${type}-facebook`,
      name: "facebook",
      label: "facebook.com/",
      type: "text",
      placeholder: "username",
      value: socialData.facebook,
      icon: <FaFacebook />,
      baseUrl: "https://facebook.com/",
    },
    {
      id: `${type}-linkedin`,
      name: isPlayer ? "linkedin-profile" : "linkedin-company",
      label: isPlayer ? "linkedin.com/in/" : "linkedin.com/company/",
      type: "text",
      placeholder: isPlayer ? "username" : "company",
      value: socialData.linkedin,
      icon: <FaLinkedin />,
      baseUrl: isPlayer
        ? "https://linkedin.com/in/"
        : "https://linkedin.com/company/",
    },
    {
      id: `${type}-github`,
      name: "github",
      label: "github.com/",
      type: "text",
      placeholder: "username",
      value: socialData.github,
      icon: <FaGithub />,
      baseUrl: "https://github.com/",
    },
    {
      id: `${type}-reddit`,
      name: isPlayer ? "reddit-username" : "reddit-subreddit",
      label: isPlayer ? "reddit.com/u/" : "reddit.com/r/",
      type: "text",
      placeholder: isPlayer ? "username" : "subreddit",
      value: socialData.reddit,
      icon: <FaReddit />,
      baseUrl: isPlayer ? "https://reddit.com/u/" : "https://reddit.com/r/",
    },
    {
      id: `${type}-steam`,
      name: !isPlayer ? "steam-group" : undefined,
      label: !isPlayer ? "steamcommunity.com/groups/" : undefined,
      type: "text",
      placeholder: !isPlayer ? "group" : undefined,
      value: socialData.steam,
      icon: <FaSteam />,
      baseUrl: !isPlayer
        ? "https://steamcommunity.com/groups/"
        : "https://steamcommunity.com/id/",
    },
    {
      id: `${type}-vk`,
      name: "vk",
      label: "vk.com/",
      type: "text",
      placeholder: "username",
      value: socialData.vk,
      icon: <FaVk />,
      baseUrl: "https://vk.com/",
    },
    {
      id: `${type}-weibo`,
      name: "weibo",
      label: "weibo.com/",
      type: "text",
      placeholder: "username",
      value: socialData.weibo,
      icon: <FaWeibo />,
      baseUrl: "https://weibo.com/",
    },
  ];

  const filteredFields = allFields.filter(
    (field) => field.name && field.label && field.placeholder
  );

  const hasSocialData = filteredFields.some(
    (field) => field.value && field.value.trim() !== ""
  );

  const formatWebsiteUrl = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  if (!hasSocialData && !canEdit) {
    return null;
  }

  return (
    <div>
      <fieldset>
        <legend>{isPlayer ? "Player Socials" : "Team Socials"}</legend>
        {filteredFields.map((field) => {
          if (isEditMode || (field.value && field.value.trim() !== "")) {
            return isEditMode ? (
              <InputField
                key={field.id}
                {...field}
                minLength={3}
                maxLength={30}
              />
            ) : (
              <div key={field.id}>
                {field.name === "website" ? (
                  <a
                    href={formatWebsiteUrl(field.value!)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {field.icon} {field.value}
                  </a>
                ) : (
                  <a
                    href={`${field.baseUrl}${field.value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {field.icon} {field.value}
                  </a>
                )}
              </div>
            );
          }
          return null;
        })}
        {canEdit && (
          <button type="button" onClick={toggleEditMode}>
            {isEditMode ? "Save" : "Edit"}
          </button>
        )}
      </fieldset>
    </div>
  );
};

export default Socials;
