import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appTitle: {
    textAlign: "center",
    flexGrow: 1,
  },
  homeLink: {
    textDecoration: "none",
    color: "#ffffff",
  },
}));
const PrivateNavbar = ({ openSidebar, closeSideBar }) => {
  const classes = useStyles();
  const { loginUser } = useContext(AuthContext);
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={openSidebar}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <div to="/" className={classes.appTitle}>
          <Link to="/" className={classes.homeLink}>
            <Typography>Mahjong Score Manager</Typography>
          </Link>
        </div>
        <Typography>{loginUser.name}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default PrivateNavbar;
