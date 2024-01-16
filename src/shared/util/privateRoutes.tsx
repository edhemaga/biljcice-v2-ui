import { Navigate, Outlet } from "react-router-dom";
import { hasAuthData } from "../helpers/helper";

const PrivateRoutes = () => {
  return hasAuthData() ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
