import React, { useContext, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

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

  return (
    <>
      <h1>Login form</h1>
      <div>
        email :{" "}
        <TextField
          value={formInput.communityId}
          onChange={(e) =>
            setFormInput({ ...formInput, email: e.target.value })
          }
        />
      </div>
      <div>
        Password :{" "}
        <TextField
          value={formInput.password}
          onChange={(e) =>
            setFormInput({ ...formInput, password: e.target.value })
          }
        />
      </div>
      <Button onClick={handleLogin}>send</Button>
      <Link to="/signup">Go to sign up</Link>
    </>
  );
};

export default Login;
