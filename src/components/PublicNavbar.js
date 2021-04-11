import React from "react";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

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
const PublicNavbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <div className={classes.appTitle}>
          <Link to="/" className={classes.homeLink}>
            Mahjong Score Manager
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default PublicNavbar;
