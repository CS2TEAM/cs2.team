import { useEffect, useState } from "react";
import axios from "axios";
import CreateTeamForm from "./CreateTeamForm";
import SteamSignInButton from "./SteamSignInButton";

interface User {
  displayName: string;
  profilePicture: string;
  steamid: string;
  playerTeamOwner: string | null;
}

const BenefitsList: React.FC = () => (
  <>
    <p>By creating a team, you can:</p>
    <ul>
      <li>
        <strong>Recruit Players:</strong> Find and recruit top talent to join
        your team and compete in tournaments.
      </li>
      <li>
        <strong>Promote Your Brand:</strong> Expose your team and brand to a
        wider audience, increasing visibility and potential sponsorship
        opportunities.
      </li>
      <li>
        <strong>Build Community:</strong> Connect with other players and teams,
        fostering a sense of community and collaboration.
      </li>
      <li>
        <strong>Improve Skills:</strong> Collaborate with your team to practice
        and improve your gameplay, strategies, and tactics.
      </li>
    </ul>
  </>
);

const CreateTeam: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Create CS2 Team - CS2.TEAM";

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user`, { withCredentials: true })
      .then((response) => {
        if (response.data && response.data.displayName) {
          setUser(response.data as User);
        } else {
          setUser(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Create Your CS2 Team</h1>
      {user ? (
        <>
          <p>
            Welcome, {user.displayName}! You're just a few steps away from
            creating your esports team.
          </p>
          <BenefitsList />
          {user.playerTeamOwner ? (
            <p>You already own a team.</p>
          ) : (
            <CreateTeamForm user={user} profileSteamId={user.steamid} />
          )}
        </>
      ) : (
        <>
          <p>
            Welcome! You're just a few steps away from creating your esports
            team.
          </p>
          <BenefitsList />
          <form>
            <fieldset>
              <legend>Create A Team</legend>
              <SteamSignInButton />
            </fieldset>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateTeam;
