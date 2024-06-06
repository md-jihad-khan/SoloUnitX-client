import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading)
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-yellow-500 text-center"></span>
      </div>
    );
  if (user) return children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export default PrivateRoute;
