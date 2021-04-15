import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CommunityContext } from "../contexts/CommunityContext";
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  Typography,
  Divider,
  Select,
  IconButton,
} from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";
import { PointTransitionChart, RankDetailPieChart } from "../components/Charts";

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    margin: 20,
  },
  card: {
    width: "100%",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
  },
  rankingCardContent: {
    width: "100%",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
    padding: 0,
  },
  rankingCardTitle: {
    fontSize: 20,
  },
  rankingCardContentValue: {
    marginTop: 10,
    marginBottom: 10,
  },
  rankingCardContentRank: {
    marginBottom: -10,
  },
  pointGraphTitle: {
    marginLeft: 20,
    textAlign: "left",
  },
  rankPieGraphTitle: {
    marginLeft: 20,
    textAlign: "left",
  },
}));
const User = () => {
  const classes = useStyles();
  const { users, result, privateHistory } = useContext(CommunityContext);
  const { uid } = useParams();

  const rankingNames = [
    "Total Point",
    "Average Point",
    "Average Order",
    "Win Rate",
  ];
  const rankingKeys = [
    "total_point",
    "average_point",
    "average_order",
    "win_rate",
  ];
  const rankKeys = [
    "total_point_rank",
    "average_point_rank",
    "average_order_rank",
    "win_rate_rank",
  ];

  const UserDashboardRankingItem = ({ item, index }) => {
    return (
      <Card className={classes.card}>
        <CardContent className={classes.rankingCardContent}>
          <Typography className={classes.rankingCardTitle}>
            {rankingNames[index]}
          </Typography>
          <Divider />
          <Typography className={classes.rankingCardContentValue} variant="h4">
            {item[rankingKeys[index]]}
          </Typography>
          <Typography className={classes.rankingCardContentRank} variant="h6">
            Rank : {item[rankKeys[index]]}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const UserDashboardPointGraph = () => {
    if (privateHistory[uid])
      return (
        <Card className={classes.card} style={{ paddingLeft: 0 }}>
          <Typography className={classes.pointGraphTitle} variant="h5">
            Point Transition
          </Typography>
          <Divider />
          <CardContent
            style={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}
          >
            <PointTransitionChart
              pointTransitionData={privateHistory[uid].games}
            />
          </CardContent>
        </Card>
      );
    else return null;
  };

  const UserDashboardPieGraph = () => {
    const [chartOption, setChartOption] = useState({
      chartType: 0,
      chartNumber: 0,
    });
    const handleSwitchChart = () => {
      if (chartOption.chartType)
        setChartOption({ ...chartOption, chartType: 0 });
      else setChartOption({ ...chartOption, chartType: 1 });
    };
    if (result[uid])
      return (
        <Card className={classes.card}>
          <div style={{ display: "flex" }}>
            <Typography
              style={{ flexGrow: 1 }}
              className={classes.rankPieGraphTitle}
              variant="h5"
            >
              Order Details
            </Typography>
            <IconButton
              style={{ height: 32, width: 32, marginRight: 10 }}
              onClick={handleSwitchChart}
            >
              <CachedIcon color="primary" />
            </IconButton>
            <Select
              native
              color="primary"
              style={{ marginRight: 10 }}
              value={chartOption.chartNumber}
              onChange={(e) =>
                setChartOption({
                  ...chartOption,
                  chartNumber: parseInt(e.target.value),
                })
              }
            >
              <option value={0}>Total</option>
              <option value={1}>East</option>
              <option value={2}>South</option>
              <option value={3}>West</option>
              <option value={4}>North</option>
            </Select>
          </div>
          <Divider />
          <CardContent style={{ paddingBottom: 5 }}>
            <RankDetailPieChart
              rankDetailData={result[uid].rank_detail}
              chartOption={chartOption}
            />
          </CardContent>
        </Card>
      );
    else return null;
  };

  if (users[uid])
    return (
      <>
        <Typography variant="h5">{users[uid].name}'s page</Typography>
        {result[uid] ? (
          <div className={classes.dashboardContainer}>
            <Grid container spacing={3}>
              {[0, 1, 2, 3].map((index) => (
                <Grid item xs={6} sm={6} md={3} lg={3} key={index}>
                  <UserDashboardRankingItem item={result[uid]} index={index} />
                </Grid>
              ))}
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <UserDashboardPointGraph />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <UserDashboardPieGraph />
              </Grid>
            </Grid>
          </div>
        ) : (
          <div>nodata</div>
        )}
      </>
    );
  else return null;
};

export default User;
