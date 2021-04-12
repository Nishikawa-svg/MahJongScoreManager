import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Grid,
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
  makeStyles,
  TableRow,
} from "@material-ui/core";
import { CommunityContext } from "../contexts/CommunityContext";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: 30,
    margin: "20px 0px",
  },
  historyLink: {
    textDecoration: "none",
    color: "blue",
    textAlign: "left",
  },
  roundNumber: {
    fontSize: 20,
    margin: "10px 0px",
  },
  tablePaper: {
    margin: "0px 5px",
    marginBottom: 20,
  },
  tableHeadCell: {
    color: "#ffffff",
    backgroundColor: "#333333",
    padding: "15px 0px",
  },
  tableBodyCell: {
    padding: "15px 0px",
  },

  anotherRoundLink: {
    margin: "0px 20px",
    textDecoration: "none",
    color: "blue",
  },
}));

const directions = ["east", "south", "west", "north"];

const HistoryDetailTable = ({ history, users }) => {
  const getDate = (seconds) => {
    let date = new Date(seconds * 1000);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  const classes = useStyles();
  if (history && Object.keys(users))
    return (
      <Paper className={classes.tablePaper}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeadCell} align="center">
                  player
                </TableCell>
                <TableCell className={classes.tableHeadCell} align="center">
                  seat
                </TableCell>
                <TableCell className={classes.tableHeadCell} align="center">
                  score
                </TableCell>
                <TableCell className={classes.tableHeadCell} align="center">
                  point
                </TableCell>
                <TableCell className={classes.tableHeadCell} align="center">
                  rank
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {directions.map((direction) => (
                <TableRow key={direction}>
                  <TableCell className={classes.tableBodyCell} align="center">
                    {users[history[direction].uid].name}
                  </TableCell>
                  <TableCell className={classes.tableBodyCell} align="center">
                    {direction}
                  </TableCell>
                  <TableCell className={classes.tableBodyCell} align="center">
                    {history[direction].score}
                  </TableCell>
                  <TableCell className={classes.tableBodyCell} align="center">
                    {history[direction].point}
                  </TableCell>
                  <TableCell className={classes.tableBodyCell} align="center">
                    {history[direction].rank}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>scored by : {history.scorer}</div>
        <div>created at : {getDate(history.created_at.seconds)}</div>
      </Paper>
    );
  else return <></>;
};

const HistoryDetail = () => {
  const { history, users } = useContext(CommunityContext);
  const classes = useStyles();
  const { historyId } = useParams();
  const NextResultLink = () => {
    const id = parseInt(historyId);
    if (id !== history[history.length - 1].game_number)
      return (
        <Link to={`/history/${id + 1}`} className={classes.anotherRoundLink}>
          to round {id + 1}
        </Link>
      );
    else return <></>;
  };
  const PreviousResultLink = () => {
    const id = parseInt(historyId);
    if (id !== history[0].game_number)
      return (
        <Link to={`/history/${id - 1}`} className={classes.anotherRoundLink}>
          to round {id - 1}
        </Link>
      );
    else return <></>;
  };

  if (history.length)
    return (
      <>
        <div className={classes.pageTitle}>History Details</div>
        <Link to="/history" className={classes.historyLink}>
          back to history
        </Link>
        <div className={classes.roundNumber}>Round {historyId}</div>
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={10} lg={8}>
            <HistoryDetailTable
              history={history[historyId - 1]}
              users={users}
            />
            <Grid container justify="flex-end"></Grid>
            <Grid container justify="space-between">
              <Grid item>
                <NextResultLink />
              </Grid>
              <Grid item>
                <PreviousResultLink />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  else return <></>;
};
export default HistoryDetail;
