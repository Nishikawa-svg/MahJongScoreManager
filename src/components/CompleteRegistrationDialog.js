import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  makeStyles,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

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
  },
}));

const CompleteRegistrationDialog = ({
  completeModalOpen,
  handleCompleteModalClose,
}) => {
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
              <CheckCircleOutlineIcon
                className={classes.dialogIcon}
                color="secondary"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};
export default CompleteRegistrationDialog;
