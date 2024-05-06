import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ redirectPath = "/auth/login", children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("user");
  useEffect(() => {
    if (token !== null) {
   
      setIsAuthenticated(true);
      console.log(isAuthenticated)
     
    };

  }, [token]);
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;