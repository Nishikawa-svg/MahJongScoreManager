import React, { useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  makeStyles,
  Typography,
  Divider,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CommunityContext } from "../contexts/CommunityContext";
import EditIcon from "@material-ui/icons/Edit";
import logo from "../static/images/mahjong.jpg";

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
  avatar: {
    width: 120,
    height: 120,
    marginTop: 20,
  },
  editButton: {},
  communityName: {
    margin: "15px 0px",
  },
  card: {
    textAlign: "left",
    margin: 10,
  },
  cardContent: {
    padding: "auto 0px",
  },
  cardTitle: {
    margin: "10px 0px",
    textAlign: "center",
    fontWeight: "bolder",
  },
  cardSubtitle: {
    marginLeft: 10,
    fontWeight: "bold",
  },
  cardList: {
    paddingLeft: 30,
  },
  originalRulesText: {
    padding: 10,
    whiteSpace: "pre-wrap",
  },
  originalRulesEditIconButton: {
    color: "#123312",
  },
}));

const DashboardContentRules = ({ aboutCommunity, rules }) => {
  const classes = useStyles();

  const getUmaDescription = (option) => {
    if (option === 0) return "Do not adopt";
    else if (option === 1) return "1st +10, 2nd +5, 3rd -5, 4th -10";
    else if (option === 2) return "1st +20, 2nd +10, 3rd -10, 4th -20";
    else if (option === 3) return "1st +30, 2nd +10, 3rd -10, 4th -30";
    else if (option === 4)
      return `1st ${rules.uma_points_customize.first}, 2nd ${rules.uma_points_customize.second}, 3rd ${rules.uma_points_customize.third} ,4th ${rules.uma_points_customize.fourth}`;
    else return "set up invalid";
  };

  const getTobiDescription = (option, point) => {
    if (option) return `${point} point`;
    else return "Do not adopt";
  };

  const getEdgeCalculationMethodDescription = (option) => {
    if (option === 0) return "Always round down";
    else if (option === 1) return "Always round up";
    else if (option === 2) return "Round down 4 or less and round up 5 or more";
    else if (option === 3) return "Round down 5 or less and round up 6 or more";
    else if (option === 4)
      return `Round down above ${rules.score_base} and round up blow ${rules.score_base}`;
    else if (option === 5)
      return "Calculate with a small number without adjustmejt";

    return;
  };

  return (
    <Card className={classes.card}>
      <Typography variant="h5" className={classes.cardTitle}>
        Rules
      </Typography>
      <Divider />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" className={classes.cardSubtitle}>
          Basic
        </Typography>
        <ul className={classes.cardList}>
          <li>
            <Typography>Players : 4</Typography>
          </li>
          <li>
            <Typography>Length of game : East {"&"} South</Typography>
          </li>
          <li>
            <Typography>
              When the score under zero :{" "}
              {rules.score_under_zero ? "Continue" : "Finish"}
            </Typography>
          </li>
          <li>
            <Typography>A game starts with {rules.score_start}.</Typography>
          </li>
          <li>
            <Typography>
              The final point is calculated based on {rules.score_base}.
            </Typography>
          </li>
        </ul>
        <Typography variant="h6" className={classes.cardSubtitle}>
          Calculation Method
        </Typography>
        <ul className={classes.cardList}>
          <li>
            <Typography>
              Top award : {rules.top_award ? "Adopt" : "Do not adopt."}
            </Typography>
          </li>
          <li>
            <Typography>
              Placement point : {getUmaDescription(rules.uma)}
            </Typography>
          </li>
          <li>
            <Typography>
              Bunus and penarti points when the game end with tobi :{" "}
              {getTobiDescription(rules.tobi, rules.tobi_point)}
            </Typography>
          </li>
          <li>
            <Typography>
              Edge point calculation method :{" "}
              {getEdgeCalculationMethodDescription(rules.score_edge_calc)}
            </Typography>
          </li>
          <li>
            <Typography>
              Top point ajustment :{" "}
              {rules.top_point_adjustment ? "Adopt" : "Do not adopt"}
            </Typography>
          </li>
          <li>
            <Typography>
              Same placement :{" "}
              {rules.same_rank
                ? "Acceptable. Rank bonus and top award are devided into equal parts. If not divisible, the remainder is added to the player close to the starter."
                : "Unacceptable. The closer to the starter, the higher the rank."}
            </Typography>
          </li>
        </ul>
        <Typography variant="h6" className={classes.cardSubtitle}>
          Original Rules
        </Typography>
        <Typography
          style={{ textAlign: "center", color: "#666666", padding: "5px 0px" }}
        >
          You can memo original rules here.
        </Typography>
        <Typography className={classes.originalRulesText}>
          {aboutCommunity.original_rules_text}
        </Typography>
      </CardContent>
    </Card>
  );
};

const DashboardContentCommunity = ({ aboutCommunity, users, games }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleLinkToEdit = () => {
    history.push("/home/edit");
  };

  const getDate = (seconds) => {
    let date = new Date(seconds * 1000);
    return `${date.toLocaleDateString()}`;
  };
  if ("created_at" in aboutCommunity)
    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid container direction="column">
            <Grid item>
              <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                  <Grid container justify="center">
                    <Avatar
                      className={classes.avatar}
                      src={logo}
                      alt="avatar"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Grid container justify="center">
                    <IconButton
                      className={classes.editButton}
                      onClick={handleLinkToEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justify="center">
                <Typography variant="h4" className={classes.communityName}>
                  {aboutCommunity.community_name}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container justify="center">
                  <Typography style={{ marginRight: 10 }}>
                    {users} users
                  </Typography>
                  <Typography style={{ marginLeft: 10 }}>
                    {games} games
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify="center">
                  <Typography>
                    Established in {getDate(aboutCommunity.created_at.seconds)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  else return <></>;
};

const Home = () => {
  const { aboutCommunity, rules, users, history } = useContext(
    CommunityContext
  );
  if (Object.keys(aboutCommunity))
    return (
      <>
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={8} lg={6}>
            <Grid container direction="column">
              <Grid item xs={12}>
                <DashboardContentCommunity
                  aboutCommunity={aboutCommunity}
                  users={Object.keys(users).length}
                  games={Object.keys(history).length}
                />
              </Grid>
              <Grid item xs={12}>
                <DashboardContentRules
                  aboutCommunity={aboutCommunity}
                  rules={rules}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  else return null;
};

export default Home;
