import React, { useContext, useState } from "react";
import { CommunityContext } from "../contexts/CommunityContext";
import {
  Grid,
  Button,
  makeStyles,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  Table,
  TableBody,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: 30,
    margin: "20px 0px",
  },

  mainContainer: {
    marginBottom: 100,
  },
  menuButtonFocused: {
    textTransform: "none",
    margin: "5px 5px",
  },

  menuButtonUnFocused: {
    textTransform: "none",
    margin: "5px 5px",
    color: "#ffffff",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
  },
  tableContainer: {
    borderRadius: "5px",
    backgroundColor: "white",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
  },
  headRow: {
    backgroundColor: "#333333",
  },
  headCell: {
    color: "#ffffff",
    fontWeight: "bolder",
  },
  userLink: {
    textDecoration: "none",
    color: "blue",
  },
}));

const rankingKeys = [
  "totalPointRanking",
  "totalGameRanking",
  "averagePointRanking",
  "averageOrderRanking",
  "winRateRanking",
];
const rankingName = [
  "total point",
  "total games",
  "average point",
  "average order",
  "win rate",
];

const RankingTable = (users, rankings, menuIndex) => {
  let key = rankingKeys[menuIndex];
  let option = rankingName[menuIndex];
  const classes = useStyles();
  return (
    <TableContainer className={classes.tableContainer}>
      <Table>
        <TableHead>
          <TableRow className={classes.headRow}>
            <TableCell className={classes.headCell} align="center">
              rank
            </TableCell>
            <TableCell className={classes.headCell} align="center">
              player
            </TableCell>
            <TableCell className={classes.headCell} align="center">
              {option}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rankings[key].map((ranking) => (
            <TableRow key={ranking.uid}>
              <TableCell align="center">{ranking.rank}</TableCell>
              <TableCell align="center">
                <Link to={`/users/${ranking.uid}`} className={classes.userLink}>
                  {users[ranking.uid].name}
                </Link>
              </TableCell>
              <TableCell align="center">{ranking.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Ranking = () => {
  const classes = useStyles();
  const { users, rankings } = useContext(CommunityContext);
  const [menuIndex, setMenuIndex] = useState(0);

  const rankingMenu = (
    <>
      {rankingName.map((ranking, index) => (
        <Button
          key={index}
          onClick={() => setMenuIndex(index)}
          color={index === menuIndex ? "secondary" : "inherit"}
          variant="contained"
          className={
            index === menuIndex
              ? classes.menuButtonFocused
              : classes.menuButtonUnFocused
          }
        >
          {ranking}
        </Button>
      ))}
    </>
  );

  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.pageTitle}>Ranking</div>
        {rankingMenu}
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={8} lg={6}>
            {RankingTable(users, rankings, menuIndex)}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Ranking;
