import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let isLoggedIn: boolean = true;
   //localStorage.getItem("token") ? true : false;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
