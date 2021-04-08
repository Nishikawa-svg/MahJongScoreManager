import React, { useContext, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { AuthContext } from "../contexts/AuthContext";

const initialFormInput = {
  communityId: "",
  password: "",
};

const Login = () => {
  const [formInput, setFormInput] = useState(initialFormInput);
  const { login } = useContext(AuthContext);
  const handleLogin = () => {
    login(formInput.communityId, formInput.password);
  };

  return (
    <>
      <h1>Login form</h1>
      <div>
        Community ID :{" "}
        <TextField
          value={formInput.communityId}
          onChange={(e) =>
            setFormInput({ ...formInput, communityId: e.target.value })
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
    </>
  );
};

export default Login;
