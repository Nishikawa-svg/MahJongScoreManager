import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  makeStyles,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  dailog: {},
  dialogTitle: {
    textAlign: "center",
  },
  dialogIcon: {
    textAlign: "center",
    fontSize: 130,
    marginTop: 80,
    marginBottom: 80,
    color: "#7cfc00",
  },
}));

const CompleteRegistrationDialog = ({ completeModalOpen }) => {
  const classes = useStyles();

  return (
    <>
      <Dialog
        open={completeModalOpen}
        className={classes.dialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle className={classes.dialogTitle}>
          Registration Completed
        </DialogTitle>
        <DialogContent>
          <Grid container justify="center">
            <Grid item>
              <CheckCircleIcon className={classes.dialogIcon} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};
export default CompleteRegistrationDialog;
