import "./App.css";
import { CircularProgress } from "@material-ui/core";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { set } from "./redux/user/userSlice";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./shared/util/privateRoutes";

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Navigation from "./components/Navigation/Navigation";
import Alerts from "./components/Alerts/Alerts";
import Readings from "./components/Readings/Readings";
import Devices from "./components/Devices/Devices";

import { IUser } from "./shared/models/User/IUser";

import { getUserData, hasAuthData } from "./shared/helpers/helper";

function App() {
  const dispatch = useDispatch();
  // const userId = useSelector((state: RootState) => state.user.id);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(
    () => {
      async function fetchUser() {
        if (!isAuthenticated && hasAuthData()) {
          const token = localStorage.getItem("token") ?? "";
          const user = await getUserData(token);
          dispatch(set(user as IUser));
          setIsAuthenticated(true);
        }
      }
      fetchUser();
      return () => {
        setIsAuthenticated(false);
      };
    },
    // TODO možda staviti dependency userId
    []
  );

  return (
    <>
      <Router>
        {useSelector((state: RootState) => state.user.id) ? (
          <Navigation />
        ) : null}
        <div className="app-wrapper">
          <Routes>
            {useSelector((state: RootState) => state.user.id) ? (
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/devices" element={<Devices />} />
                <Route path="/readings" element={<Readings />} />
                <Route path="/alerts" element={<Alerts />} />
              </Route>
            ) : (
              <Route element={<CircularProgress size={40} />} />
            )}
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
