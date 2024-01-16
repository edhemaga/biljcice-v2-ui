import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./shared/util/privateRoutes";

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Navigation from "./components/Navigation/Navigation";
import { useEffect, useState } from "react";
import { getUserData, hasAuthData } from "./shared/helpers/helper";
import { useDispatch } from "react-redux";
import { IUser } from "./shared/models/User/IUser";
import { set } from "./redux/user/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { CircularProgress } from "@material-ui/core";

function App() {
  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      if (!isAuthenticated && hasAuthData()) {
        const token = localStorage.getItem("token") ?? "";
        const user = await getUserData(token);
        dispatch(set(user as Partial<IUser>));
        setIsAuthenticated(true);
      }
    }
    fetchUser();
    return () => {
      setIsAuthenticated(false);
    };
  }, []);

  return (
    <div style={{ height: "100dvh" }}>
      <Router>
        <Navigation />
        <Routes>
          {useSelector((state: RootState) => state.user.id) ? (
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          ) : (
            <Route element={<CircularProgress size={40} />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
