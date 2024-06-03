import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Apartments from "../pages/Apartments/Apartments";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../pages/Dashboard/MyProfile";
import Announcements from "../pages/Dashboard/Announcements";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/apartments",
        element: <Apartments />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <MyProfile />,
      },
      {
        path: "announcements",
        element: <Announcements />,
      },
    ],
  },
]);
