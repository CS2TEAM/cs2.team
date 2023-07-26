import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileAbout from "./ProfileAbout";
import GameDetails from "./GameDetails";
import Socials from "./Socials";
import styles from "./Profile.module.css";
import flagStyles from "./CountryFlag.module.css";
import { getCountryFlagClass } from "../utils/countryFlags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSteam } from "@fortawesome/free-brands-svg-icons";
import { formatDistanceToNowStrict } from "date-fns";
import { languageOptions, genderOptions } from "../utils/inputOptions";

interface User {
  displayName: string;
  profilePicture: string;
  steamid: string;
}

interface Profile {
  playerCreatedDateTime?: string;
  steamid: string;
  personaname: string;
  avatarfull: string;
  profileurl: string;
  loccountrycode?: string;
  lastOnline?: string;
  email?: string;
  gender?: string;
  language?: string;
  dateOfBirth?: string;
  private?: boolean;
  discord?: string;
  faceit?: string;
}

const InputField: React.FC<{
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  pattern?: string;
  title?: string;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
}> = ({
  id,
  name,
  label,
  placeholder,
  type = "text",
  pattern,
  title,
  minLength,
  maxLength,
  defaultValue,
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      pattern={pattern}
      title={title}
      minLength={minLength}
      maxLength={maxLength}
      defaultValue={defaultValue}
    />
  </div>
);

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const SelectField: React.FC<{
  id: string;
  name: string;
  label: string;
  options: SelectOption[];
  defaultValue?: string;
}> = ({ id, name, label, options, defaultValue }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <select id={id} name={name} defaultValue={defaultValue}>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const RadioField: React.FC<{
  id: string;
  name: string;
  label: string;
  value: string;
  checked?: boolean;
}> = ({ id, name, label, value, checked }) => (
  <div>
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      defaultChecked={checked}
    />
    <label htmlFor={id}>{label}</label>
  </div>
);

const Profile: React.FC = () => {
  const { steamid } = useParams<{ steamid: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/player/${steamid}`)
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching player profile:", error);
        setLoading(false);
      });
  }, [steamid]);

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
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (profile) {
      document.title = `${profile.personaname} - Profile - CS2.TEAM`;
    }
  }, [profile]);

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const canEdit = user && user.steamid === profile.steamid;

  return (
    <div className={styles.page}>
      <div className={styles.profileTitle}>
        <img
          src={profile.avatarfull}
          alt={`${profile.personaname}'s avatar`}
          className={styles.avatar}
        />
        <div className={styles.profileTitleContainer}>
          <div className={styles.username}>
            <a
              href={profile.profileurl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h1>{profile.personaname}</h1>
              <span>
                <FontAwesomeIcon icon={faSteam} />
              </span>
            </a>
            {profile.loccountrycode && (
              <span
                className={
                  flagStyles.countryFlag +
                  " " +
                  flagStyles[getCountryFlagClass(profile.loccountrycode)]
                }
              ></span>
            )}
          </div>
          {profile.lastOnline ? (
            <p>
              Last Online:{" "}
              {formatDistanceToNowStrict(new Date(profile.lastOnline))} ago
            </p>
          ) : (
            <p>Private Profile</p>
          )}
          {profile.playerCreatedDateTime ? (
            <p>
              Member since{" "}
              {new Date(profile.playerCreatedDateTime).toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            </p>
          ) : (
            <p>Not a CS2.TEAM member, invite them!</p>
          )}
          {isEditMode ? (
            <>
              <InputField
                id="player-email"
                name="email"
                label="Email"
                placeholder="Change your email"
                type="email"
                defaultValue={profile.email}
              />
              <InputField
                id="player-dob"
                name="dob"
                label="Date of Birth"
                placeholder="Select your date of birth"
                type="date"
                defaultValue={profile.dateOfBirth}
              />
              <SelectField
                id="player-gender"
                name="gender"
                label="Gender"
                options={genderOptions}
                defaultValue={profile.gender}
              />
              <SelectField
                id="player-language"
                name="language"
                label="Language"
                options={languageOptions}
                defaultValue={profile.language}
              />
              <InputField
                id="player-discord"
                name="discord"
                label="Discord"
                placeholder="Enter your Discord"
                defaultValue={profile.discord}
              />
              <InputField
                id="player-faceit"
                name="faceit"
                label="FACEIT"
                placeholder="Enter your FACEIT"
                defaultValue={profile.faceit}
              />
              <div>
                <label>Private Profile</label>
                <RadioField
                  id="private-profile-yes"
                  name="private-profile"
                  label="Yes"
                  value="yes"
                  checked={profile.private === true}
                />
                <RadioField
                  id="private-profile-no"
                  name="private-profile"
                  label="No"
                  value="no"
                  checked={profile.private === false}
                />
              </div>
            </>
          ) : (
            <>
              <div>{profile.discord}</div>
              <div>{profile.faceit}</div>
            </>
          )}
          {canEdit && (
            <button type="button" onClick={toggleEditMode}>
              {isEditMode ? "Save" : "Edit"}
            </button>
          )}
        </div>
      </div>
      <form>
        <fieldset>
          <ProfileAbout
            type="player"
            user={user}
            profileSteamId={steamid || ""}
          />
          <GameDetails user={user} profileSteamId={steamid || ""} />
          <Socials type="player" user={user} id={steamid || ""} />
        </fieldset>
      </form>
    </div>
  );
};

export default Profile;
