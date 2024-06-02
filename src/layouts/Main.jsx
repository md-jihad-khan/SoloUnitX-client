import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const Main = () => {
  return (
    <>
      <ScrollRestoration />
      <div className="h-16 relative z-50 w-full">
        <Navbar></Navbar>
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
