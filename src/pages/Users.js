import React, { useContext, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { CommunityContext } from "../contexts/CommunityContext";
import { Link } from "react-router-dom";

const Users = () => {
  const { users } = useContext(CommunityContext);
  return (
    <>
      <div>Users</div>
      <br />
      <div>User List</div>
      <ul>
        {Object.keys(users).map((key) => (
          <li key={key}>
            <Link to={`/users/${key}`}>{users[key].name}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <AddUser />
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
