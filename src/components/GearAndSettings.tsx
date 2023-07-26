import { useState, useEffect } from "react";

interface User {
  displayName: string;
  profilePicture: string;
  steamid: string;
}

interface GearAndSettingsProps {
  user: User | null;
  profileSteamId: string;
}

const GearAndSettings: React.FC<GearAndSettingsProps> = ({
  user,
  profileSteamId,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setIsEditMode(false);
  }, [profileSteamId]);

  const canEdit = user && user.steamid === profileSteamId;

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  return (
    <div>
      <fieldset>
        <legend>Gear and Settings</legend>
        <div>
          <label htmlFor="mouse-dpi">Mouse DPI</label>
          <input
            type="number"
            id="mouse-dpi"
            name="mouse-dpi"
            min="0"
            max="16000"
            step="100"
            placeholder="Mouse DPI"
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label htmlFor="mouse-sensitivity">Mouse Sensitivity</label>
          <input
            type="number"
            id="mouse-sensitivity"
            name="mouse-sensitivity"
            min="0"
            max="5"
            step="0.01"
            placeholder="Mouse sensitivity"
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label htmlFor="resolution">Resolution</label>
          <select id="resolution" name="resolution" disabled={!isEditMode}>
            <option value="">Select your resolution</option>
            <option value="1176x664">1176x664</option>
            <option value="1280x720">1280x720</option>
            <option value="1360x768">1360x768</option>
            <option value="1366x768">1366x768</option>
            <option value="1834x786">1834x786</option>
            <option value="1600x900">1600x900</option>
            <option value="1920x1080">1920x1080</option>
          </select>
        </div>
        <div>
          <label htmlFor="aspect-ratio">Aspect Ratio</label>
          <select id="aspect-ratio" name="aspect-ratio" disabled={!isEditMode}>
            <option value="">Select your aspect ratio</option>
            <option value="4:3">4:3</option>
            <option value="16:9">16:9</option>
            <option value="16:10">16:10</option>
          </select>
        </div>
        <div>
          <label htmlFor="cpu">CPU</label>
          <input
            type="text"
            id="cpu"
            name="cpu"
            placeholder="CPU"
            pattern="^[a-zA-Z0-9\s\-.,]+$"
            title="Allowed characters: letters, numbers, spaces, hyphens, fullstops, and commas."
            minLength={3}
            maxLength={30}
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label htmlFor="gpu">GPU</label>
          <input
            type="text"
            id="gpu"
            name="gpu"
            placeholder="GPU"
            pattern="^[a-zA-Z0-9\s\-.,]+$"
            title="Allowed characters: letters, numbers, spaces, hyphens, fullstops, and commas."
            minLength={3}
            maxLength={30}
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label htmlFor="ram">RAM</label>
          <input
            type="text"
            id="ram"
            name="ram"
            placeholder="RAM"
            pattern="^[a-zA-Z0-9\s\-.,]+$"
            title="Allowed characters: letters, numbers, spaces, hyphens, fullstops, and commas."
            minLength={3}
            maxLength={30}
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label htmlFor="mouse">Mouse</label>
          <input
            type="text"
            id="mouse"
            name="mouse"
            placeholder="Mouse"
            pattern="^[a-zA-Z0-9\s\-.,]+$"
            title="Allowed characters: letters, numbers, spaces, hyphens, fullstops, and commas."
            minLength={3}
            maxLength={30}
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label htmlFor="keyboard">Keyboard</label>
          <input
            type="text"
            id="keyboard"
            name="keyboard"
            placeholder="Keyboard"
            pattern="^[a-zA-Z0-9\s\-.,]+$"
            title="Allowed characters: letters, numbers, spaces, hyphens, fullstops, and commas."
            minLength={3}
            maxLength={30}
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label htmlFor="monitor">Monitor</label>
          <input
            type="text"
            id="monitor"
            name="monitor"
            placeholder="Monitor"
            pattern="^[a-zA-Z0-9\s\-.,]+$"
            title="Allowed characters: letters, numbers, spaces, hyphens, fullstops, and commas."
            minLength={3}
            maxLength={30}
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label htmlFor="headset">Headset</label>
          <input
            type="text"
            id="headset"
            name="headset"
            placeholder="Headset"
            pattern="^[a-zA-Z0-9\s\-.,]+$"
            title="Allowed characters: letters, numbers, spaces, hyphens, fullstops, and commas."
            minLength={3}
            maxLength={30}
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label htmlFor="mouse-mat">Mouse Mat</label>
          <input
            type="text"
            id="mouse-mat"
            name="mouse-mat"
            placeholder="Mouse mat"
            pattern="^[a-zA-Z0-9\s\-.,]+$"
            title="Allowed characters: letters, numbers, spaces, hyphens, fullstops, and commas."
            minLength={3}
            maxLength={30}
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label htmlFor="motherboard">Motherboard</label>
          <input
            type="text"
            id="motherboard"
            name="motherboard"
            placeholder="Motherboard"
            pattern="^[a-zA-Z0-9\s\-.,]+$"
            title="Allowed characters: letters, numbers, spaces, hyphens, fullstops, and commas."
            minLength={3}
            maxLength={30}
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label htmlFor="ssd">SSD</label>
          <input
            type="text"
            id="ssd"
            name="ssd"
            placeholder="SSD"
            pattern="^[a-zA-Z0-9\s\-.,]+$"
            title="Allowed characters: letters, numbers, spaces, hyphens, fullstops, and commas."
            minLength={3}
            maxLength={30}
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label htmlFor="psu">PSU</label>
          <input
            type="text"
            id="psu"
            name="psu"
            placeholder="PSU"
            pattern="^[a-zA-Z0-9\s\-.,]+$"
            title="Allowed characters: letters, numbers, spaces, hyphens, fullstops, and commas."
            minLength={3}
            maxLength={30}
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label htmlFor="cpu-cooler">CPU Cooler</label>
          <input
            type="text"
            id="cpu-cooler"
            name="cpu-cooler"
            placeholder="CPU cooler"
            pattern="^[a-zA-Z0-9\s\-.,]+$"
            title="Allowed characters: letters, numbers, spaces, hyphens, fullstops, and commas."
            minLength={3}
            maxLength={30}
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label htmlFor="computer-case">Computer Case</label>
          <input
            type="text"
            id="computer-case"
            name="computer-case"
            placeholder="Computer case"
            pattern="^[a-zA-Z0-9\s\-.,]+$"
            title="Allowed characters: letters, numbers, spaces, hyphens, fullstops, and commas."
            minLength={3}
            maxLength={30}
            disabled={!isEditMode}
          />
        </div>
        {canEdit && (
          <button type="button" onClick={toggleEditMode}>
            {isEditMode ? "Save" : "Edit"}
          </button>
        )}
      </fieldset>
    </div>
  );
};

export default GearAndSettings;
