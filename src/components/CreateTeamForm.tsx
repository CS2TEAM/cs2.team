import { useNavigate } from "react-router-dom";

interface User {
  displayName: string;
  profilePicture: string;
  steamid: string;
}

interface CreateTeamFormProps {
  user: User | null;
  profileSteamId: string;
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
  required?: boolean;
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
  required = false,
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
      required={required}
    />
  </div>
);

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({
  user,
  profileSteamId,
}) => {
  const navigate = useNavigate();
  const canEdit = user && user.steamid === profileSteamId;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const teamName = form.teamName.value;
    const teamTag = form.teamTag.value;

    if (user && canEdit) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/createTeam`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamName,
            teamTag,
            steamid: user.steamid,
          }),
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          alert(`Team created successfully with ID: ${data.teamID}`);
          navigate(`/team/${data.teamID}`);
        } else {
          const errorData = await response.json();
          console.error("Error creating team:", errorData);
          alert(`Error creating team: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Error creating team:", error);
        alert("Error creating team");
      }
    }
  };

  if (!canEdit) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Create A Team</legend>
        <InputField
          id="teamName"
          name="teamName"
          label="Team Name"
          placeholder="Enter your team name"
          pattern="^(?!.*\s{2,})[a-zA-Z0-9\s]*$"
          title="Team name should be 3-30 characters long and in a valid format."
          minLength={3}
          maxLength={30}
          required
        />
        <InputField
          id="teamTag"
          name="teamTag"
          label="Team Tag"
          placeholder="Enter your team tag"
          pattern="^(?!.*\s{2,})[a-zA-Z0-9\s]*$"
          title="Team tag should be 2-5 characters long and in a valid format."
          minLength={2}
          maxLength={5}
          required
        />
        <div>
          <button type="submit">Create Team</button>
        </div>
      </fieldset>
    </form>
  );
};

export default CreateTeamForm;
