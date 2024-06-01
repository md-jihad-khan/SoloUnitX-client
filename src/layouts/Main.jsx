import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const Main = () => {
  return (
    <>
      <ScrollRestoration />
      <div className="h-28 relative z-20 w-full">
        <Navbar></Navbar>
      </div>
      <Outlet />
    </>
  );
};

export default Main;
