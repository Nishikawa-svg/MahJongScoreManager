import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { AuthContext } from "../contexts/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useContext(AuthContext);
  const handleSignUp = () => {
    signUp(email, password);
  };
  return (
    <>
      <Link to="/">go to log in page</Link>
      <div>Sign Up</div>
      <br />
      <div>
        email :{" "}
        <TextField
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        password :{" "}
        <TextField
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button onClick={handleSignUp}>Sign Up</Button>
    </>
  );
};

export default SignUp;
