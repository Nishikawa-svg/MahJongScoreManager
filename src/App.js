import React, { useContext } from "react";
import PrivateLayout from "./components/PrivateLayout";
import PublicLayout from "./components/PublicLayout";
import { makeStyles } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Scoring from "./pages/Scoring";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Users from "./pages/Users";
import User from "./pages/User";
import Ranking from "./pages/Ranking";
import History from "./pages/History";
import Providers from "./contexts/Contexts";
import { AuthContext } from "./contexts/AuthContext";
import HistoryDetail from "./pages/HistoryDetail";

const useStyles = makeStyles((theme) => ({
  app: {
    textAlign: "center",
  },
  privateMainContainer: {
    paddingTop: 64,
    // height: "100vh",
    [theme.breakpoints.up("md")]: {
      paddingLeft: 240,
    },
  },
  publicMainContainer: {
    // height: "100vh",
    paddingTop: 64,
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.app}>
        <Router>
          <Providers>
            <PrivateRoute />
          </Providers>
        </Router>
      </div>
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
              <Route path="/history/:historyId">
                <HistoryDetail />
              </Route>
              <Route path="/history">
                <History />
              </Route>
              <Route path={`/users/:uid`}>
                <User />
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
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/">
                <Redirect to="/home" />
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
              <Route path="/" exact>
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
