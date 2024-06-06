import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import PropTypes from "prop-types";
const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading)
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-yellow-500 text-center"></span>
      </div>
    );
  if (role === "admin") return children;
  return <Navigate to="/" />;
};

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.element,
};
