import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  displayName: string;
  profilePicture: string;
  steamid: string;
}

interface GameDetailsProps {
  user: User | null;
  profileSteamId: string;
}

const GameDetails: React.FC<GameDetailsProps> = ({ user, profileSteamId }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [roles, setRoles] = useState({
    entry: false,
    awper: false,
    lurker: false,
    rifler: false,
    support: false,
    igl: false,
  });
  const [favMap, setFavMap] = useState("");

  useEffect(() => {
    setIsEditMode(false);
    fetchPlayerDetails();
  }, [profileSteamId]);

  const canEdit = user && user.steamid === profileSteamId;

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const fetchPlayerDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/player/${profileSteamId}`
      );
      const {
        playerCounterStrikeRoleEntry,
        playerCounterStrikeRoleAWPer,
        playerCounterStrikeRoleLurker,
        playerCounterStrikeRoleRifler,
        playerCounterStrikeRoleSupport,
        playerCounterStrikeRoleIGL,
        playerCounterStrikeFavouriteMap,
      } = response.data;

      setRoles({
        entry: playerCounterStrikeRoleEntry || false,
        awper: playerCounterStrikeRoleAWPer || false,
        lurker: playerCounterStrikeRoleLurker || false,
        rifler: playerCounterStrikeRoleRifler || false,
        support: playerCounterStrikeRoleSupport || false,
        igl: playerCounterStrikeRoleIGL || false,
      });
      setFavMap(playerCounterStrikeFavouriteMap || "");
    } catch (error) {
      console.error("Error fetching player details", error);
    }
  };

  const hasRoles = Object.values(roles).some((role) => role === true);
  const hasFavMap = Boolean(favMap);

  if (!hasRoles && !hasFavMap && !canEdit) {
    return null;
  }

  return (
    <div>
      <fieldset>
        <legend>Game Details</legend>
        <div>
          <label>Roles</label>
          <div>
            {isEditMode ? (
              <>
                <div>
                  <input
                    type="checkbox"
                    id="role-entry"
                    name="roles"
                    value="Entry"
                    checked={roles.entry}
                    onChange={() => setRoles({ ...roles, entry: !roles.entry })}
                  />
                  <label htmlFor="role-entry">Entry</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="role-awper"
                    name="roles"
                    value="AWPer"
                    checked={roles.awper}
                    onChange={() => setRoles({ ...roles, awper: !roles.awper })}
                  />
                  <label htmlFor="role-awper">AWPer</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="role-lurker"
                    name="roles"
                    value="Lurker"
                    checked={roles.lurker}
                    onChange={() =>
                      setRoles({ ...roles, lurker: !roles.lurker })
                    }
                  />
                  <label htmlFor="role-lurker">Lurker</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="role-rifler"
                    name="roles"
                    value="Rifler"
                    checked={roles.rifler}
                    onChange={() =>
                      setRoles({ ...roles, rifler: !roles.rifler })
                    }
                  />
                  <label htmlFor="role-rifler">Rifler</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="role-support"
                    name="roles"
                    value="Support"
                    checked={roles.support}
                    onChange={() =>
                      setRoles({ ...roles, support: !roles.support })
                    }
                  />
                  <label htmlFor="role-support">Support</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="role-igl"
                    name="roles"
                    value="IGL"
                    checked={roles.igl}
                    onChange={() => setRoles({ ...roles, igl: !roles.igl })}
                  />
                  <label htmlFor="role-igl">IGL</label>
                </div>
              </>
            ) : (
              <>
                {roles.entry && <p>Entry</p>}
                {roles.awper && <p>AWPer</p>}
                {roles.lurker && <p>Lurker</p>}
                {roles.rifler && <p>Rifler</p>}
                {roles.support && <p>Support</p>}
                {roles.igl && <p>IGL</p>}
              </>
            )}
          </div>
        </div>
        {favMap && (
          <div>
            <label htmlFor="fav-map">Favourite Map</label>
            {isEditMode ? (
              <select
                id="fav-map"
                name="fav-map"
                value={favMap}
                onChange={(e) => setFavMap(e.target.value)}
              >
                <option value="">Select your favourite map</option>
                <optgroup label="Active Duty">
                  <option value="Dust II">Dust II</option>
                  <option value="Mirage">Mirage</option>
                  <option value="Vertigo">Vertigo</option>
                  <option value="Ancient">Ancient</option>
                  <option value="Inferno">Inferno</option>
                  <option value="Nuke">Nuke</option>
                  <option value="Anubis">Anubis</option>
                </optgroup>
                <optgroup label="Reserves">
                  <option value="Overpass">Overpass</option>
                  <option value="Cache">Cache</option>
                  <option value="Train">Train</option>
                  <option value="Office">Office</option>
                  <option value="Thera">Thera</option>
                  <option value="Mills">Mills</option>
                </optgroup>
              </select>
            ) : (
              <p>{favMap}</p>
            )}
          </div>
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

export default GameDetails;
