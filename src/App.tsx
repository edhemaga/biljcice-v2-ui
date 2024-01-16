import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./shared/util/privateRoutes";

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/auth/login/Login";
import NotFound from "./components/NotFound/NotFound";
import Navigation from "./components/Navigation/Navigation";
import { useEffect, useState } from "react";
import { getUserData, hasAuthData } from "./shared/helpers/helper";
import { useDispatch } from "react-redux";
import { IUser } from "./shared/models/User/IUser";
import { set } from "./redux/user/userSlice";

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
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
