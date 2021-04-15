import React, { useState, useContext, useEffect } from "react";
import {
  TextField,
  Card,
  CardContent,
  Button,
  Grid,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import { CommunityContext } from "../contexts/CommunityContext";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: 30,
    margin: "10px 0px",
  },
  card: {
    margin: 10,
  },
  cardContent: {},
  communityNameTextField: {
    minWidth: 240,
    margin: "5px 0px",
  },
  originalRulesTextField: {
    margin: "5px 0px",
  },
  saveButton: {
    marginTop: 10,
    color: "blue",
    border: "solid 1px",
    textTransform: "none",
  },
  cancelButton: {
    marginTop: 10,
    color: "red",
    border: "solid 1px",
    textTransform: "none",
  },
}));

const Edit = () => {
  const { aboutCommunity, updateAboutCommunity } = useContext(CommunityContext);
  const classes = useStyles();
  const [communityName, setCommunityName] = useState("");
  const [originalRulesText, setOriginalRulesText] = useState("");
  const [editName, setEditName] = useState(false);
  const [editRules, setEditRules] = useState(false);

  useEffect(() => {
    setCommunityName(aboutCommunity.community_name);
    setOriginalRulesText(aboutCommunity.original_rules_text);
  }, [aboutCommunity.community_name, aboutCommunity.original_rules_text]);

  const handleEditName = () => {
    setEditName(true);
  };
  const handleEditRules = () => {
    setEditRules(true);
  };
  const handleCloseEdit = () => {
    setEditName(false);
    setEditRules(false);
  };
  const handleUpdateAboutCommunity = () => {
    let newCommunityName = communityName.trim();
    let newOriginalRulesText = originalRulesText.trim();
    if (newCommunityName === "") {
      alert("Enter communityName");
    } else {
      updateAboutCommunity(newCommunityName, newOriginalRulesText);
      handleCloseEdit();
    }
  };

  return (
    <>
      <div className={classes.pageTitle}>Edit</div>
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={6} lg={5}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Grid container direction="column">
                {editName && (
                  <>
                    <Grid item>
                      <Grid container justify="flex-start">
                        <Typography>Community Name</Typography>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid container justify="flex-start">
                        <TextField
                          className={classes.communityNameTextField}
                          value={communityName}
                          variant="outlined"
                          fullWidth
                          onChange={(e) => setCommunityName(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container justify="space-around">
                        <Grid item>
                          <Button
                            className={classes.cancelButton}
                            onClick={handleCloseEdit}
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            className={classes.saveButton}
                            onClick={handleUpdateAboutCommunity}
                          >
                            Save
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )}
                {editRules && (
                  <>
                    <Grid item>
                      <Grid container justify="flex-start">
                        <Typography>Original Rules</Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <TextField
                        className={classes.originalRulesTextField}
                        variant="outlined"
                        value={originalRulesText}
                        onChange={(e) => setOriginalRulesText(e.target.value)}
                        multiline
                        rows={12}
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <Grid container justify="space-around">
                        <Grid item>
                          <Button
                            className={classes.cancelButton}
                            onClick={handleCloseEdit}
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            className={classes.saveButton}
                            onClick={handleUpdateAboutCommunity}
                          >
                            Save
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )}
                {!(editName || editRules) && (
                  <>
                    <Grid item>
                      <Grid container justify="flex-start">
                        <Typography variant="h6">
                          Community Name :
                          <IconButton onClick={handleEditName}>
                            <EditIcon />
                          </IconButton>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        justify="center"
                        style={{ margin: "10px 0px" }}
                      >
                        <Typography variant="h5">
                          {aboutCommunity.community_name}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container justify="flex-start">
                        <Typography variant="h6">
                          Original Rules :
                          <IconButton onClick={handleEditRules}>
                            <EditIcon />
                          </IconButton>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container justify="flex-start">
                        <Grid item>
                          <Typography
                            style={{
                              padding: 10,
                              whiteSpace: "pre-wrap",
                              textAlign: "start",
                            }}
                          >
                            {aboutCommunity.original_rules_text}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Edit;
