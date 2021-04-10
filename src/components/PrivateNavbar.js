import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AuthContext } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appTitle: {
    textAlign: "center",
    flexGrow: 1,
  },
}));
const PrivateNavbar = ({ openSidebar, closeSideBar }) => {
  const classes = useStyles();
  const { loginUser } = useContext(AuthContext);
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <div>{loginUser.name}</div>
        <div className={classes.appTitle}>Mahjong Score Manager</div>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={openSidebar}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default PrivateNavbar;
