import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const Main = () => {
  return (
    <>
      <Navbar />

      <div className="h-[150vh]">
        <Outlet />
      </div>
    </>
  );
};

export default Main;
