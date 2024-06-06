import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Apartments from "../pages/Apartments/Apartments";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../pages/Dashboard/MyProfile";
import Announcements from "../pages/Dashboard/Announcements";
import MakePayment from "../pages/Dashboard/member/MakePayment";
import PaymentHistory from "../pages/Dashboard/member/PaymentHistory";
import ManageMembers from "../pages/Dashboard/admin/ManageMembers";
import MakeAnnouncement from "../pages/Dashboard/admin/MakeAnnouncement";
import AgreementRequest from "../pages/Dashboard/admin/AgreementRequest";
import ManageCoupons from "../pages/Dashboard/admin/ManageCoupons";
import PrivateRoute from "./PrivateRoute";
import MemberRoute from "./MemberRoute";
import AdminRoute from "./AdminRoute";

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
        element: (
          <PrivateRoute>
            <MyProfile />,
          </PrivateRoute>
        ),
      },
      {
        path: "announcements",
        element: (
          <PrivateRoute>
            <Announcements />
          </PrivateRoute>
        ),
      },
      {
        path: "makePayment",
        element: (
          <MemberRoute>
            <MakePayment />
          </MemberRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <MemberRoute>
            <PaymentHistory />
          </MemberRoute>
        ),
      },
      {
        path: "manageMembers",
        element: (
          <AdminRoute>
            <ManageMembers />
          </AdminRoute>
        ),
      },
      {
        path: "makeAnnouncement",
        element: (
          <AdminRoute>
            <MakeAnnouncement />
          </AdminRoute>
        ),
      },
      {
        path: "agreementRequest",
        element: (
          <AdminRoute>
            <AgreementRequest />
          </AdminRoute>
        ),
      },
      {
        path: "manageCoupons",
        element: (
          <AdminRoute>
            <ManageCoupons />
          </AdminRoute>
        ),
      },
    ],
  },
]);
