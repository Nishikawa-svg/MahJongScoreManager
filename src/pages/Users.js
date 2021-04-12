import React, { useContext, useState } from "react";
import { Button, TextField, Grid, Paper, makeStyles } from "@material-ui/core";
import { CommunityContext } from "../contexts/CommunityContext";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: 30,
    margin: "20px 0px",
  },

  personBox: {
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    padding: "15px",
    margin: "5px 5px",
    // "--c": "rgba(255,255,255,0.7)",
    // "--t": "transparent",
    // backgroundImage:
    //   "repeating-linear-gradient(45deg, var(--c) 0, var(--c) 20px, var(--t) 20px, var(--t) 32px, var(--c) 32px, var(--c) 44px, var(--t) 44px, var(--t) 56px, var(--c) 56px, var(--c) 68px, var(--t) 68px, var(--t) 80px, var(--c) 0),  repeating-linear-gradient(-45deg, var(--c) 0, var(--c) 20px, var(--t) 20px, var(--t) 32px, var(--c) 32px, var(--c) 44px, var(--t) 44px, var(--t) 56px, var(--c) 56px, var(--c) 68px, var(--t) 68px, var(--t) 80px, var(--c) 0),  linear-gradient(to bottom right, #FC354C, #0ABFBC)",
    borderRadius: "10px",
  },
  personLink: {
    textDecoration: "none",
  },
  personIcon: {
    fontSize: 28,
  },
  personName: {
    fontSize: 20,
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
      <div>User List</div>
      <Grid container justify="center">
        <Grid item xs={12} sm={6}>
          {Object.keys(users).map((key) => (
            <Link to={`/users/${key}`} className={classes.personLink} key={key}>
              <Paper className={classes.personBox}>
                <Grid container>
                  <Grid item>
                    <PersonIcon className={classes.personIcon} />
                  </Grid>
                  <Grid item>
                    <div className={classes.personName}>{users[key].name}</div>
                  </Grid>
                </Grid>
              </Paper>
            </Link>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

const initialNewUser = { name: "" };
const AddUser = () => {
  const [newUser, setNewUser] = useState(initialNewUser);
  const { addNewUser } = useContext(CommunityContext);
  const handleAddNewUser = () => {
    addNewUser(newUser);
    setNewUser(initialNewUser);
  };

  return (
    <>
      <div>add user</div>
      <div>
        name :{" "}
        <TextField
          variant="outlined"
          value={newUser.name}
          onChange={(e) => setNewUser({ name: e.target.value })}
        />
      </div>
      <Button onClick={handleAddNewUser}>add</Button>
    </>
  );
};

export default Users;
