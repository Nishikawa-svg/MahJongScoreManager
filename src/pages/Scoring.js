import React, { useState, useContext } from "react";
import {
  Grid,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { CommunityContext } from "../contexts/CommunityContext";
import { AuthContext } from "../contexts/AuthContext";
import ConfirmResultDialog from "../components/ConfirmResultDialog";
import CompleteRegistrationDialog from "../components/CompleteRegistrationDialog";

import { calculatePoints } from "../utils/CalculatePoints";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: 24,
    margin: "10px 0px",
  },
  formContaniner: {
    padding: "0px 10px",
  },
  scorePaper: {
    marginBottom: 10,
    padding: "5px 5px",
  },
  directionContainer: {
    border: "1px solid",
    borderRadius: "10px",
    marginBottom: 20,
    paddingBottom: 20,
  },
  direction: {
    textAlign: "center",
    margin: 10,
  },
  selectForm: {
    width: "90%",
  },
  inputForm: {
    width: "90%",
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
  },
  card: {},
  cardContent: {
    paddingTop: 3,
  },
  confirmButton: {
    marginTop: 20,
  },
}));

const directions = ["East", "South", "West", "North"];

const initialPlayers = ["", "", "", ""];
const initialScores = ["", "", "", ""];
const initialPlayerError = {
  player: [false, false, false, false],
  message: "",
};
const initialScoreError = { score: [false, false, false, false], message: "" };

const Scoring = () => {
  const { users, rules, addGameResult } = useContext(CommunityContext);
  const { loginUser } = useContext(AuthContext);
  const [players, setPlayers] = useState(initialPlayers);
  const [scores, setScores] = useState(initialScores);
  const [gameRecode, setGameRecode] = useState();
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [playerError, setPlayerError] = useState(initialPlayerError);
  const [scoreError, setScoreError] = useState(initialScoreError);
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
  const handleConfirm = () => {
    const scorer = loginUser.uid;
    const {
      isValid,
      playerErrorCheck,
      scoreErrorCheck,
      playerErrorMessage,
      scoreErrorMessage,
      newGameRecode,
    } = calculatePoints(players, scores, rules, scorer);
    if (!isValid) {
      setPlayerError({ player: playerErrorCheck, message: playerErrorMessage });
      setScoreError({ score: scoreErrorCheck, message: scoreErrorMessage });
    }
    if (isValid) {
      setGameRecode(newGameRecode);
      setPlayerError(initialPlayerError);
      setScoreError(initialScoreError);
      setModalOpen(true);
    }
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleRecodeGameResult = () => {
    addGameResult(gameRecode);
    setModalOpen(false);
    handleCompleteModalOpen();
    setTimeout(() => handleCompleteModalClose(), 1500);
    setPlayers(initialPlayers);
    setScores(initialScores);
  };
  const handleCompleteModalClose = () => {
    setCompleteModalOpen(false);
  };
  const handleCompleteModalOpen = () => {
    setCompleteModalOpen(true);
  };

  return (
    <>
      <div className={classes.pageTitle}>Scoring</div>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={8} lg={6}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.errorMessage}>
                {playerError.message}
              </Typography>
              <Typography className={classes.errorMessage}>
                {scoreError.message}
              </Typography>
              {directions.map((direction, index) => (
                <div key={index}>
                  <Typography variant="h6" className={classes.direction}>
                    Start with {direction}
                  </Typography>
                  <Grid container justify="center">
                    <Grid item xs={6}>
                      <FormControl
                        variant="outlined"
                        className={classes.selectForm}
                      >
                        <InputLabel>Player</InputLabel>
                        <Select
                          native
                          label="Player"
                          value={players[index]}
                          onChange={(e) => handlePlayerChange(e, index)}
                          error={playerError.player[index]}
                        >
                          <option value="" />
                          {Object.keys(users).map((key) => (
                            <option key={key} value={key}>
                              {users[key].name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        className={classes.inputForm}
                        label="Score"
                        type="number"
                        value={scores[index]}
                        error={scoreError.score[index]}
                        onChange={(e) => handleScoreChange(e, index)}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </div>
              ))}
              <div className={classes.confirmButton}>
                <ConfirmResultDialog
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  handleConfirm={handleConfirm}
                  handleModalClose={handleModalClose}
                  handleRecodeGameResult={handleRecodeGameResult}
                  gameRecode={gameRecode}
                  users={users}
                />
              </div>
              <CompleteRegistrationDialog
                handleCompleteModalClose={handleCompleteModalClose}
                completeModalOpen={completeModalOpen}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* {directions.map((direction, index) => (
        <Grid
          container
          justify="center"
          key={direction}
          className={classes.formContaniner}
        >
          <Grid item xs={12} sm={8} md={8} lg={6}>
            <Paper className={classes.scorePaper}>
              <Grid container justify="center">
                <Grid item>
                  <Typography className={classes.direction}>
                    Start with {direction}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justify="space-around">
                <Grid item xs={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.selectForm}
                  >
                    <InputLabel>Player</InputLabel>
                    <Select
                      native
                      label="player"
                      value={players[index]}
                      onChange={(e) => handlePlayerChange(e, index)}
                      error={playerError.player[index]}
                    >
                      <option value="" />
                      {Object.keys(users).map((key) => (
                        <option key={key} value={key}>
                          {users[key].name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className={classes.inputForm}
                    label="Score"
                    type="number"
                    value={scores[index]}
                    error={scoreError.score[index]}
                    onChange={(e) => handleScoreChange(e, index)}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ))} */}
    </>
  );
};
export default Scoring;
