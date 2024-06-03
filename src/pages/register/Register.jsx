/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import login from "../../assets/login.png";
import shadow from "../../assets/login shadow.png";
import { AuthContext } from "../../providers/AuthProvider";

import { imageUpload } from "../../components/utils";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const locationAnimation = {
  y: [15, -15, 15], // Vertical movement
  transition: {
    duration: 2, // Adjust for animation speed (in seconds)
    ease: "easeInOut", // Smoother motion
    repeat: Infinity, // Continuously repeat the animation
  },
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const location = useLocation();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload your Image");
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.username.value;
    const email = e.target.email.value;
    const image = e.target.image.files[0];
    const password = e.target.password.value;

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    if (password.length < 6) {
      setLoading(false);
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password must be at least 6 characters long",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (!uppercaseRegex.test(password)) {
      setLoading(false);
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password must contain at least one uppercase letter",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (!lowercaseRegex.test(password)) {
      setLoading(false);
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password must contain at least one lowercase letter",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      try {
        const photoUrl = await imageUpload(image);
        const result = await createUser(email, password);
        await updateUserProfile(name, photoUrl);

        const userInfo = {
          name: result?.user?.email,
          email: result?.user?.displayName,
          role: "user",
        };
        await axiosPublic.post("/users", userInfo).then(() => {
          Swal.fire({
            icon: "success",
            iconColor: "#F4C210",
            title: "Registration Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(false);
          navigate("/");
        });
      } catch (error) {
        setLoading(false);
        if (error.code === "auth/email-already-in-use") {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Email is already in use",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          console.log(error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `${error.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  return (
    <>
      <div className="md:w-10/12 mx-auto mb-10 mt-5">
        <div className="text-center ">
          <h1 className="text-2xl md:text-4xl font-bold mb-1">Register</h1>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64  my-4 border-yellow-500 border rounded "></hr>
            <div className="absolute px-4 -translate-x-1/2 bg-base-100 left-1/2 ">
              <svg
                className="w-2 h-2 text-gray-400 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 14"
              >
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="md:flex justify-center items-center font-poppins">
          <div className="md:w-1/2 relative">
            <motion.img
              className="z-10 relative "
              src={login}
              alt=""
              animate={locationAnimation}
            />
            <img src={shadow} className="absolute top-10 z-0" alt="" />
          </div>
          <div className="w-full max-w-md mx-auto p-8 space-y-3 rounded-xl md:w-1/2">
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-1 text-sm">
                <label htmlFor="username" className="block">
                  Username
                </label>
                <input
                  required
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="w-full px-4 py-3 rounded-md input border-yellow-500 border"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block ">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-md input border-yellow-500 border"
                />
              </div>
              <div className=" flex text-sm">
                <div className="file_upload flex-1  py-3 relative border-4 border-dotted border-yellow-300 rounded-lg">
                  <div className="flex flex-col w-max mx-auto text-center">
                    <label>
                      <input
                        className="text-sm btn cursor-pointer w-36 hidden"
                        type="file"
                        onChange={(e) => handleImage(e.target.files[0])}
                        name="image"
                        id="image"
                        accept="image/*"
                        hidden
                      />
                      <div className="bg-yellow-500 text-white  rounded font-semibold cursor-pointer p-1 px-3 hover:bg-yellow-500">
                        {/* {imageText} */}
                        {imageText.length > 20
                          ? imageText.split(".")[0].slice(0, 15) +
                            "...." +
                            imageText.split(".")[1]
                          : imageText}
                      </div>
                    </label>
                  </div>
                </div>
                <div className=" object-cover overflow-hidden flex items-center">
                  {imagePreview && (
                    <img className="h-16 w-16" src={imagePreview} />
                  )}
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="password" className="block ">
                  Password
                </label>
                <div className="flex items-center relative">
                  <span
                    className="cursor-pointer absolute right-4"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    id="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-md input border-yellow-500 border"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="block  w-full p-3 text-center rounded-sm bg-yellow-500 text-white"
                type="submit"
              >
                {loading ? (
                  <TbFidgetSpinner className="text-xl text-white animate-spin m-auto" />
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <p className="text-xs text-center sm:px-6 text-gray-600">
              Already have an account?
              <Link
                to={"/login"}
                className="underline text-yellow-500 text-lg  font-bold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
