import React, { useContext } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Card,
  CardContent,
} from "@material-ui/core";
import { CommunityContext } from "../contexts/CommunityContext";
import { useHistory } from "react-router-dom";
import AddUserDialog from "../components/AddUserDialog";
import ColoredAvatar from "../components/ColoredAvatar";
const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: 24,
    margin: "10px 0px",
  },
  card: {},
  CardContent: {
    padding: 0,
  },
  userList: {},
  userListItem: {
    marginBottom: 5,
  },

  personBox: {
    padding: "15px 10px",
    margin: "10px 15px",
  },
  personLink: {
    textDecoration: "none",
  },
  personIcon: {
    fontSize: 40,
  },
  personName: {
    fontSize: 20,
    marginTop: 5,
    marginLeft: 10,
  },
}));

const Users = () => {
  const { users } = useContext(CommunityContext);
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <div className={classes.pageTitle}>Users</div>
      <Grid container justify="center">
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardContent className={classes.CardContent}>
              <List dense className={classes.userList}>
                {Object.keys(users).map((key) => (
                  <ListItem
                    key={key}
                    button
                    className={classes.userListItem}
                    onClick={() => history.push(`/users/${key}`)}
                  >
                    <ListItemAvatar>
                      <ColoredAvatar
                        number={users[key].color}
                        char={users[key].name.substr(0, 1)}
                      />
                    </ListItemAvatar>
                    <ListItemText>
                      <Typography>{users[key].name}</Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
              <Grid container justify="center">
                <AddUserDialog />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Users;
