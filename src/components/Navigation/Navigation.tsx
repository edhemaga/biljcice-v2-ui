import { FC } from "react";

//Material
import { AppBar, Toolbar, Button, makeStyles } from "@material-ui/core";

//Hooks
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set } from "../../redux/user/userSlice";

// Custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
  appBar: {
    width: "100%",
    height: "100px",
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
    dispatch(set({}));
    navigate("/login");
  };
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        {/* You can add other navbar items here if needed */}
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
