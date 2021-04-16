import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  Paper,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { AuthContext } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  formPaper: {
    marginTop: 20,
    width: "100%",
    textAlign: "center",
    marginBottom: 30,
  },
  formTitle: {
    margin: "20px 0px",
  },
  formIcon: {
    width: 40,
    height: 40,
    marginTop: 20,
  },
  formInputBox: {
    height: 40,
    marginBottom: 30,
  },
  formButton: {
    height: 50,
    marginBottom: 10,
    backgroundColor: "#1870db",
    color: "white",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "blue",
    },
  },
  linkContanier: {
    marginBottom: 5,
  },
  signinLink: {
    textDecoration: "none",
    color: "blue",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordComfirmation, setPasswordConfirmation] = useState("");
  const { signUp } = useContext(AuthContext);
  const classes = useStyles();
  const handleSignUp = () => {
    const newUsername = username.trim();
    if (password !== passwordComfirmation) {
      alert("Password and confirm password should be matched.");
    } else if (newUsername === "") {
      alert("Please enter username.");
    } else {
      signUp(username, email, password);
    }
  };
  return (
    <>
      <Grid container justify="center">
        <Grid item xs={10} sm={5} mg={4} lg={3}>
          <Paper className={classes.formPaper}>
            <Grid container justify="center">
              <Grid item xs={10}>
                <Grid container direction="column">
                  <Grid item>
                    <PersonAddIcon
                      color="secondary"
                      className={classes.formIcon}
                    />
                  </Grid>
                  <Typography className={classes.formTitle} variant="h5">
                    Sign Up
                  </Typography>
                  <Grid item>
                    <TextField
                      className={classes.formInputBox}
                      variant="outlined"
                      label="Username"
                      fullWidth
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.formInputBox}
                      variant="outlined"
                      fullWidth
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="password"
                      className={classes.formInputBox}
                      variant="outlined"
                      label="Password"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="password"
                      className={classes.formInputBox}
                      variant="outlined"
                      label="Comfirm Password"
                      fullWidth
                      value={passwordComfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      className={classes.formButton}
                      fullWidth
                      variant="contained"
                      onClick={handleSignUp}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                  <Grid container justify="flex-end">
                    <Grid item className={classes.linkContanier}>
                      <Link to="/" className={classes.signinLink}>
                        Go to sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
