import AdminProfile from "../../components/Dashboard/admin/AdminProfile";
import MemberProfile from "../../components/Dashboard/member/MemberProfile";
import UserProfile from "../../components/Dashboard/user/UserProfile";
import useRole from "../../hooks/useRole";

const MyProfile = () => {
  const [role] = useRole();

  return (
    <div>
      {role === "user" && <UserProfile />}
      {role === "member" && <MemberProfile />}
      {role === "admin" && <AdminProfile />}
    </div>
  );
};

export default MyProfile;
