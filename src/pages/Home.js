import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
}));

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.mainContainer}>
        <div>Here is Home</div>
        <div>rules</div>
        <ul>
          <li>
            Rank point : first : +20, second : +10, third : -10, fourth : -20
          </li>
          <li>Game start at 25,000.</li>
          <li>The standard of points is 30,000.</li>
          <li>
            At the 100th place of score, 5 or less is rounded down and 6 or more
            is rounded up.
          </li>
          <li>When the score drops below 0 : game finish</li>
        </ul>
        <div>other rules or discription</div>
      </div>
    </>
  );
};

export default Home;
