import { FC } from "react";

//Material
import { AppBar, Toolbar, Button, makeStyles } from "@material-ui/core";

//Hooks
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset} from "../../redux/user/userSlice";

// Custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
  appBar: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  logoutButton: {
    marginLeft: "auto",
  },
}));

const Navigation: FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logout = (): void => {
    localStorage.setItem("token", "");
    dispatch(reset());
    navigate("/login");
  };
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
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
          className={classes.logoutButton}
          onClick={logout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
