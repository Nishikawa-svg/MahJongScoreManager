import React from "react";
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appTitle: {
    textAlign: "center",
    flexGrow: 1,
  },
}));
const Navbar = ({ openSidebar, closeSideBar }) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
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

export default Navbar;
