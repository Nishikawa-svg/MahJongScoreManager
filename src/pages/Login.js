import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";

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
  formLockIcon: {
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
  signupLink: {
    textDecoration: "none",
    color: "blue",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const initialFormInput = {
  email: "",
  password: "",
};

const Login = () => {
  const [formInput, setFormInput] = useState(initialFormInput);
  const { login } = useContext(AuthContext);
  const handleLogin = () => {
    login(formInput.email, formInput.password);
  };
  const classes = useStyles();

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={10} sm={5} md={4} lg={3}>
          <Paper className={classes.formPaper}>
            <Grid container justify="center">
              <Grid item xs={10}>
                <Grid container direction="column">
                  <Grid item>
                    <LockIcon
                      color="secondary"
                      className={classes.formLockIcon}
                    />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.formTitle} variant="h5">
                      Sign In
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.formInputBox}
                      variant="outlined"
                      fullWidth
                      label="Email"
                      value={formInput.email}
                      onChange={(e) =>
                        setFormInput({ ...formInput, email: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="password"
                      className={classes.formInputBox}
                      variant="outlined"
                      label="Password"
                      fullWidth
                      value={formInput.password}
                      onChange={(e) =>
                        setFormInput({ ...formInput, password: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      className={classes.formButton}
                      fullWidth
                      variant="contained"
                      onClick={handleLogin}
                    >
                      Sign In
                    </Button>
                  </Grid>
                  <Grid container justify="flex-end">
                    <Grid item className={classes.linkContanier}>
                      <Link to="/signup" className={classes.signupLink}>
                        Go to sign up
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

export default Login;
