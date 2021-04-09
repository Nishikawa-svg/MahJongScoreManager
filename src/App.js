import React, { useContext } from "react";
import PrivateLayout from "./components/PrivateLayout";
import PublicLayout from "./components/PublicLayout";
import { makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Scoring from "./pages/Scoring";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Ranking from "./pages/Ranking";
import History from "./pages/History";
import Providers from "./contexts/Contexts";
import { AuthContext } from "./contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  privateMainContainer: {
    paddingTop: 64,
    [theme.breakpoints.up("md")]: {
      paddingLeft: 240,
    },
  },
  publicMainContainer: {
    paddingTop: 64,
  },
}));

const App = () => {
  return (
    <>
      <Router>
        <Providers>
          <PrivateRoute />
        </Providers>
      </Router>
    </>
  );
};

const PrivateRoute = () => {
  const classes = useStyles();
  const { isAuth } = useContext(AuthContext);
  return (
    <>
      {isAuth ? (
        <>
          <PrivateLayout />
          <div className={classes.privateMainContainer}>
            <Switch>
              <Route path="/history">
                <History />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/ranking">
                <Ranking />
              </Route>
              <Route path="/scoring">
                <Scoring />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </>
      ) : (
        <>
          <PublicLayout />
          <div className={classes.publicMainContainer}>
            <Switch>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </div>
        </>
      )}
    </>
  );
};

export default App;
