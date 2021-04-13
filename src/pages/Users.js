import React, { useContext } from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import { CommunityContext } from "../contexts/CommunityContext";
import { Link } from "react-router-dom";
import AddUserDialog from "../components/AddUserDialog";
import ColoredAvatar from "../components/ColoredAvatar";
const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: 24,
    margin: "10px 0px",
  },

  personBox: {
    padding: "15px",
    margin: "10px 15px",
    backgroundColor: "#f8f9fa",
    // "--c": "rgba(255,255,255,0.7)",
    // "--t": "transparent",
    // backgroundImage:
    //   "repeating-linear-gradient(45deg, var(--c) 0, var(--c) 20px, var(--t) 20px, var(--t) 32px, var(--c) 32px, var(--c) 44px, var(--t) 44px, var(--t) 56px, var(--c) 56px, var(--c) 68px, var(--t) 68px, var(--t) 80px, var(--c) 0),  repeating-linear-gradient(-45deg, var(--c) 0, var(--c) 20px, var(--t) 20px, var(--t) 32px, var(--c) 32px, var(--c) 44px, var(--t) 44px, var(--t) 56px, var(--c) 56px, var(--c) 68px, var(--t) 68px, var(--t) 80px, var(--c) 0),  linear-gradient(to bottom right, #FC354C, #0ABFBC)",
    borderRadius: "50px",
  },
  personLink: {
    textDecoration: "none",
  },
  avatar: {
    backgroundColor: "#21209c",
  },
  personIcon: {
    fontSize: 40,
  },
  personName: {
    fontSize: 26,
    marginTop: 5,
    marginLeft: 10,
  },
}));

const Users = () => {
  const { users } = useContext(CommunityContext);
  const classes = useStyles();
  return (
    <>
      <div className={classes.pageTitle}>Users</div>
      <Grid container justify="center">
        <Grid item xs={12} sm={6}>
          <Grid container justify="flex-end">
            <AddUserDialog />
          </Grid>
          {Object.keys(users).map((key) => (
            <Link to={`/users/${key}`} className={classes.personLink} key={key}>
              <Paper className={classes.personBox}>
                <Grid container>
                  <Grid item xs={2}>
                    {/* <ColoredAvatar number={users[key].color} /> */}
                    <ColoredAvatar
                      number={users[key].color}
                      char={users[key].name.substr(0, 1)}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <div className={classes.personName}>{users[key].name}</div>
                  </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
              </Paper>
            </Link>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Users;
