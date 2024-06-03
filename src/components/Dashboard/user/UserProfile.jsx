import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [username, domain] = user.email.split("@");
  return (
    <header className="px-2 py-4 mt-10 flex flex-col justify-center items-center text-center">
      <img
        className="inline-flex object-cover border-4 border-yellow-400 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-yellow-500/100 bg-yellow-50 text-yellow-500 h-24 w-24 md:h-36 md:w-36  "
        src={user.photoURL}
        alt=""
      />
      <h1 className="text-2xl font-bold mt-2">{user?.displayName}</h1>
      <h2 className="text-base md:text-xl text-gray-500 font-bold">
        {username}
        <a
          href=""
          target="_blank"
          className="text-yellow-500 hover:text-yellow-600 font-bold border-b-0 hover:border-b-4 hover:border-b-yellow-300 transition-all mb-2"
        >
          @{domain}
        </a>
      </h2>
    </header>
  );
};

export default UserProfile;
