import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUser, FaUsers } from "react-icons/fa";
import {
  FaHouse,
  FaHouseCircleCheck,
  FaHouseCircleXmark,
} from "react-icons/fa6";
import Heading from "../../shared/Heading";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const [username, domain] = user.email.split("@");
  const axiosSecure = useAxiosSecure();
  const { data: statistics = {}, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const result = await axiosSecure("/statistics");
      return result.data;
    },
  });

  if (isLoading)
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-yellow-500 text-center"></span>
      </div>
    );

  return (
    <>
      <header className="px-2 py-4 mt-10 flex flex-col justify-center items-center text-center">
        <img
          className="inline-flex object-cover border-4 border-yellow-400 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-yellow-500/100 bg-yellow-50 text-yellow-500 h-24 w-24 md:h-36 md:w-36  "
          src={user.photoURL}
          alt=""
        />
        <h1 className="text-2xl font-bold mt-2">{user?.displayName}</h1>
        <h2 className="text-base  md:text-xl text-gray-500 font-bold">
          {username}
          <span
            href=""
            target="_blank"
            className="text-yellow-500 hover:text-yellow-600 font-bold border-b-0 hover:border-b-4 hover:border-b-yellow-300 transition-all mb-2"
          >
            @{domain}
          </span>
        </h2>
      </header>
      <Heading title={"All Stats"} />
      <hr />
      <div className=" mt-8 ">
        <div className="flex items-center justify-center flex-wrap gap-5 -m-4 text-center">
          <div className="p-4 w-40 border-2 text-white bg-yellow-500 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 ">
            <FaUsers className="text-5xl mx-auto" />
            <h2 className="title-font font-bold text-3xl ">
              {statistics.totalUsers}
            </h2>
            <p className="leading-relaxed">Total Users</p>
          </div>
          <div className="p-4 w-40 border-2 text-white bg-yellow-500 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 ">
            <FaHouse className="text-5xl mx-auto" />
            <h2 className="title-font font-bold text-3xl ">
              {statistics.totalRooms}
            </h2>
            <p className="leading-relaxed">Total Rooms</p>
          </div>
          <div className="p-4 w-40 border-2 text-white bg-yellow-500 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 ">
            <FaUser className="text-5xl mx-auto" />
            <h2 className="title-font font-bold text-3xl ">
              {statistics.members}
            </h2>
            <p className="leading-relaxed">Total Members</p>
          </div>
          <div className="p-4 w-40 border-2 text-white bg-yellow-500 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 ">
            <FaHouseCircleCheck className="text-5xl mx-auto" />
            <h2 className="title-font font-bold text-3xl ">
              {parseFloat(statistics.percentageAvailable.toFixed(1))}%
            </h2>
            <p className="leading-relaxed">available rooms </p>
          </div>
          <div className="p-4 w-44 border-2 text-white bg-yellow-500 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 ">
            <FaHouseCircleXmark className="text-5xl mx-auto" />
            <h2 className="title-font font-bold text-3xl ">
              {parseFloat(statistics.percentageUnavailable.toFixed(1))}%
            </h2>
            <p className="">Unavailable rooms </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
