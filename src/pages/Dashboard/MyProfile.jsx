import UserProfile from "../../components/Dashboard/user/UserProfile";
import useRole from "../../hooks/useRole";

const MyProfile = () => {
  const [role] = useRole();

  return <div>{role === "user" && <UserProfile />}</div>;
};

export default MyProfile;
