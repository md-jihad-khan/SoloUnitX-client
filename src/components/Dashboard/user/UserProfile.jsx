import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [username, domain] = user.email.split("@");
  return (
    <>
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
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 ">
        <div className="rounded overflow-hidden flex flex-col max-w-xl mx-auto">
          <img
            className="w-full rounded-lg"
            src="https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sunset in the mountains"
          />

          <div className="relative bg-yellow-500 -mt-32 px-10 py-5  text-white rounded-lg m-10">
            <div className="">
              <p className="col-span-2">
                <strong>
                  Agreement accept date:
                  <span className=" ml-2 text-black">none</span>
                </strong>
              </p>
              <p>
                <strong>
                  Floor No:
                  <span className=" ml-2 text-black">none</span>
                </strong>
              </p>
              <p>
                <strong>Block Name:</strong>
                <span className=" ml-2 text-black font-bold">none</span>
              </p>
              <p>
                <strong>Apartment Name:</strong>
                <span className=" ml-2 font-bold text-black">none</span>
              </p>
              <p className="text-xl">
                Rent: <span className="text-white">$</span>
                <span className="text-black font-bold">none</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
