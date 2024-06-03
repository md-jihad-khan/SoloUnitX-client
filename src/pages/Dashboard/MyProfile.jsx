import MemberProfile from "../../components/Dashboard/member/MemberProfile";
import UserProfile from "../../components/Dashboard/user/UserProfile";
import useRole from "../../hooks/useRole";

const MyProfile = () => {
  const [role] = useRole();

  return (
    <div>
      {role === "user" && <UserProfile />}
      {role === "member" && <MemberProfile />}
    </div>
  );
};

export default MyProfile;
