import React from "react";
import Layout from "./components/Layout";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: 64,
    [theme.breakpoints.up("md")]: {
      paddingLeft: 240,
    },
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <>
      <Layout />
      <div className={classes.mainContainer}>main content</div>
    </>
  );
};

export default App;
