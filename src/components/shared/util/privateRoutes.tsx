import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let isLoggedIn: boolean = localStorage.getItem("token") ? true : false;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
