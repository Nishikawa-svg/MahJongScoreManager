import React from "react";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appTitle: {
    textAlign: "center",
    flexGrow: 1,
  },
}));
const PublicNavbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <div className={classes.appTitle}>Mahjong Score Manager</div>
      </Toolbar>
    </AppBar>
  );
};

export default PublicNavbar;
