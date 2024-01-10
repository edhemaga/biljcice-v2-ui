import { FC } from "react";
import { AppBar, Toolbar, Button, makeStyles } from "@material-ui/core";

// Custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
  appBar: {
    width: "100%",
    height: "auto",
    marginBottom: theme.spacing(2),
  },
  logoutButton: {
    marginLeft: "auto",
  },
}));

const Navigation: FC = () => {
  const logout = (): void => {
    localStorage.setItem("token", "");
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
