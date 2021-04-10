import React, { useState, useContext } from "react";
import {
  Grid,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import { CommunityContext } from "../contexts/CommunityContext";
import { AuthContext } from "../contexts/AuthContext";
import ConfirmResultDialog from "../components/ConfirmResultDialog";

import { calculatePoints } from "../utils/CalculatePoints";

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

const directions = ["East", "South", "West", "North"];

const initialPlayers = ["", "", "", ""];
const initialScores = ["", "", "", ""];

const Scoring = () => {
  const { users, rules, addGameResult } = useContext(CommunityContext);
  const { loginUser } = useContext(AuthContext);
  const [players, setPlayers] = useState(initialPlayers);
  const [scores, setScores] = useState(initialScores);
  const [gameRecode, setGameRecode] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();
  const handlePlayerChange = (e, index) => {
    let newPlayers = [...players];
    if (e.target.value === "") newPlayers[index] = "";
    else newPlayers[index] = e.target.value;
    setPlayers(newPlayers);
  };
  const handleScoreChange = (e, index) => {
    let newScores = [...scores];
    newScores[index] = e.target.value;
    setScores(newScores);
  };
  const numberJudge = (input) => {
    return isNaN(input);
  };
  const handleConfirm = () => {
    const scorer = loginUser.uid;
    const { valid, errorMessage, newGameRecode } = calculatePoints(
      players,
      scores,
      rules,
      scorer
    );
    console.log(valid, errorMessage, newGameRecode);
    if (!valid) alert(errorMessage);
    if (valid) {
      setGameRecode(newGameRecode);
      setModalOpen(true);
    }
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleRecodeGameResult = () => {
    addGameResult(gameRecode);
    setModalOpen(false);
    setPlayers(initialPlayers);
    setScores(initialScores);
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
                      value={players[index]}
                      onChange={(e) => handlePlayerChange(e, index)}
                    >
                      <option value="" />
                      {users.map((user) => (
                        <option key={user.uid} value={user.uid}>
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
                    label="score"
                    type="number"
                    value={scores[index]}
                    error={numberJudge(scores[index])}
                    onChange={(e) => handleScoreChange(e, index)}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ))}
      <ConfirmResultDialog
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleConfirm={handleConfirm}
        handleModalClose={handleModalClose}
        handleRecodeGameResult={handleRecodeGameResult}
        players={players}
        scores={scores}
      />
      <div>
        {scores.map((score, index) => (
          <div key={index}>
            score{index} : {score}
          </div>
        ))}
        {players.map((user, index) => (
          <div key={index}>
            user{index} : {user}
          </div>
        ))}
      </div>
    </>
  );
};
export default Scoring;
