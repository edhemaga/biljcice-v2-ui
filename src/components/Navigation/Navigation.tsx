import "./Navigation.css";

import { FC } from "react";

//Material
import { AppBar, Toolbar, Button, makeStyles } from "@mui/material";

//Hooks
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../../redux/user/userSlice";

const Navigation: FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logout = (): void => {
    localStorage.setItem("token", "");
    dispatch(reset());
    navigate("/login");
  };

  return (
    <AppBar position="static" className="appbar">
      <Toolbar>
        <Button
          color="inherit"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          onClick={() => {
            navigate("/devices");
          }}
        >
          Devices
        </Button>
        <Button
          color="inherit"
          onClick={() => {
            navigate("/readings");
          }}
        >
          Readings
        </Button>
        <Button
          color="inherit"
          onClick={() => {
            navigate("/alerts");
          }}
        >
          Alerts
        </Button>
        <Button
          color="inherit"
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
