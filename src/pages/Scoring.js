import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  directionContainer: {
    border: "1px solid",
    borderRadius: "10px",
    marginBottom: 20,
    paddingBottom: 20,
  },
  direction: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 10,
    marginTop: 20,
  },
  selectForm: {
    width: "100%",
  },
  inputForm: {
    width: "100%",
  },
}));

const users = [
  { id: 0, name: "nishikawa", selected: false },
  { id: 1, name: "kiyono", selected: false },
  { id: 2, name: "mizuno", selected: false },
  { id: 3, name: "nakajima", selected: false },
  { id: 4, name: "yoneta", selected: false },
  { id: 5, name: "seto", selected: false },
  { id: 6, name: "masanobu", selected: false },
  { id: 7, name: "pino", selected: false },
  { id: 8, name: "yamasyo", selected: false },
  { id: 9, name: "takuro", selected: false },
];

const directions = ["East", "South", "West", "North"];

const initialSelectedUsers = ["", "", "", ""];
const initialPoints = ["", "", "", ""];

const Scoring = () => {
  const [selectedUsers, setSelectedUsers] = useState(initialSelectedUsers);

  const [points, setPoints] = useState(initialPoints);
  const classes = useStyles();
  const handlePlayerChange = (e, index) => {
    let newSelectedUsers = [...selectedUsers];
    if (e.target.value === "") {
      newSelectedUsers[index] = "";
    } else {
      newSelectedUsers[index] = users[e.target.value].id;
    }
    setSelectedUsers(newSelectedUsers);
  };
  const handlePointChange = (e, index) => {
    let newPoints = [...points];
    newPoints[index] = e.target.value;
    console.log(newPoints);

    setPoints(newPoints);
  };
  const numberJudge = (input) => {
    return isNaN(input);
  };
  return (
    <>
      <div>Scoring</div>
      {directions.map((direction, index) => (
        <div key={direction} className={classes.directionContainer}>
          <div className={classes.direction}>start at {direction}</div>
          <Grid container justify="center">
            <Grid item xs={6}>
              <Grid container justify="center">
                <Grid item xs={11}>
                  <FormControl
                    variant="outlined"
                    className={classes.selectForm}
                  >
                    <InputLabel>player</InputLabel>
                    <Select
                      native
                      label="player"
                      value={selectedUsers[index]}
                      onChange={(e) => handlePlayerChange(e, index)}
                    >
                      <option value="" />
                      {users.map((user, uidx) => (
                        <option key={uidx} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="center">
                <Grid item xs={11}>
                  <TextField
                    className={classes.inputForm}
                    label="point"
                    type="number"
                    value={points[index]}
                    error={numberJudge(points[index])}
                    onChange={(e) => handlePointChange(e, index)}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ))}
      <div>
        {points.map((point, index) => (
          <div key={index}>
            point{index} : {point}
          </div>
        ))}
        {selectedUsers.map((user, index) => (
          <div key={index}>
            user{index} : {user}
          </div>
        ))}
      </div>
    </>
  );
};
export default Scoring;
