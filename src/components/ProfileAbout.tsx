import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  displayName: string;
  profilePicture: string;
  steamid: string;
}

interface ProfileAboutProps {
  type: "player" | "team";
  user: User | null;
  profileSteamId?: string;
  teamID?: string;
  teamOwner?: string;
}

const AboutField: React.FC<{
  id: string;
  placeholder: string;
  defaultValue?: string;
}> = ({ id, placeholder, defaultValue }) => (
  <div>
    <textarea
      id={id}
      name="about"
      placeholder={placeholder}
      maxLength={1500}
      defaultValue={defaultValue}
    />
  </div>
);

const ProfileAbout: React.FC<ProfileAboutProps> = ({
  type,
  user,
  profileSteamId,
  teamID,
  teamOwner,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState<{
    about?: string;
    teamAbout?: string;
  }>({});

  useEffect(() => {
    setIsEditMode(false);
  }, [profileSteamId, teamID]);

  useEffect(() => {
    if (type === "player" && profileSteamId) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/player/${profileSteamId}`)
        .then((response) => {
          const { about } = response.data;
          setProfile({ about });
        })
        .catch((error) => {
          console.error("Error fetching player profile:", error);
        });
    } else if (type === "team" && teamID) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/team/${teamID}`)
        .then((response) => {
          const { teamAbout } = response.data;
          setProfile({ teamAbout });
        })
        .catch((error) => {
          console.error("Error fetching team profile:", error);
        });
    }
  }, [profileSteamId, type, teamID]);

  const isPlayer = type === "player";

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const canEdit =
    user &&
    (isPlayer ? user.steamid === profileSteamId : user.steamid === teamOwner);

  const hasContent = isPlayer ? profile.about : profile.teamAbout;

  if (!hasContent && !canEdit) {
    return null;
  }

  return (
    <div>
      <fieldset>
        <legend>{isPlayer ? "Player Information" : "Team Information"}</legend>
        {isEditMode ? (
          <>
            <AboutField
              id={isPlayer ? "player-about" : "team-about"}
              placeholder={
                isPlayer ? "Tell us about you..." : "Tell us about the team..."
              }
              defaultValue={isPlayer ? profile.about : profile.teamAbout}
            />
          </>
        ) : (
          <pre>{isPlayer ? profile.about : profile.teamAbout}</pre>
        )}
        {canEdit && (
          <button type="button" onClick={toggleEditMode}>
            {isEditMode ? "Save" : "Edit"}
          </button>
        )}
      </fieldset>
    </div>
  );
};

export default ProfileAbout;
