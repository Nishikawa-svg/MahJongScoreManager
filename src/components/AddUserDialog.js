import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  makeStyles,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { CommunityContext } from "../contexts/CommunityContext";
import ColoredAvatar from "../components/ColoredAvatar";
import CompleteRegistrationDialog from "../components/CompleteRegistrationDialog";

const useStyles = makeStyles((theme) => ({
  addUserButton: {
    textTransform: "none",
    backgroundColor: "#ffffff",
    color: "blue",
    border: "solid 1px",
  },
  personAddButtonContent: {},
  personAddButtonIcon: {
    marginRight: 10,
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogMessage: {
    textAlign: "center",
    marginTop: 30,
  },
  dialogContentText: {
    textAlign: "center",
  },
  dialogInputBox: {
    margin: "20px 0px",
  },
  avatarContainer: {
    padding: "10px 0px",
  },
  avatarUnFocusedButton: {
    padding: "10px 0px",
    borderRadius: "5px",
    border: "solid 0px",
  },
  avatarFocusedButton: {
    padding: "10px 0px",
    borderRadius: "5px",
    //border: "#ffffff",
    border: "solid 1px #000000",
  },
  errorMessage: {
    color: "red",
    // marginTop: 20,
  },
  dialogCancelButton: {
    textTransform: "none",
    color: "red",
    border: "solid 1px",
  },
  dialogRegisterButton: {
    textTransform: "none",
    color: "blue",
    border: "solid 1px",
  },
}));

const AddUserDialog = () => {
  const classes = useStyles();
  const [newUser, setNewUser] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [inputError, setInputError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const { addNewUser, users } = useContext(CommunityContext);
  const handleAddNewUser = () => {
    let isUserDuplicated = false;
    const newUsername = newUser.trim();
    Object.keys(users).forEach((key) => {
      if (users[key].name === newUsername) isUserDuplicated = true;
    });
    if (isUserDuplicated) {
      setInputError({
        isError: true,
        errorMessage: `"${newUsername}" is already exist. Please give it a different name.`,
      });
    } else {
      addNewUser(newUsername, selectedAvatar);
      setNewUser("");
      setSelectedAvatar(0);
      setOpenModal(false);
      handleCompleteModalOpen();

      setTimeout(() => handleCompleteModalClose(), 1500);
    }
  };
  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleCompleteModalOpen = () => {
    setCompleteModalOpen(true);
  };
  const handleCompleteModalClose = () => {
    setCompleteModalOpen(false);
  };

  return (
    <>
      <Button className={classes.addUserButton} onClick={handleModalOpen}>
        <PersonAddIcon className={classes.personAddButtonIcon} />
        <div className={classes.personAddButtonContent}>Add User</div>
      </Button>
      <Dialog
        className={classes.dialog}
        open={openModal}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle className={classes.dialogTitle}>
          User Registration
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <div className={classes.dialogMessage}>
                Please enter username and select avatar.
              </div>
            </Grid>
            <Grid item xs={10}>
              <div className={classes.errorMessage}>
                {inputError.errorMessage}
              </div>
              <TextField
                className={classes.dialogInputBox}
                label="Username"
                fullWidth
                variant="outlined"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                error={inputError.isError}
              />
              <Grid container justify="center">
                {[1, 2, 3, 4, 5, 6].map((number) => (
                  <Grid item xs={4} key={number}>
                    <Grid
                      container
                      justify="center"
                      className={classes.avatarContainer}
                    >
                      <Grid item>
                        <Button
                          variant="outlined"
                          className={
                            number === selectedAvatar
                              ? classes.avatarFocusedButton
                              : classes.avatarUnFocusedButton
                          }
                          onClick={() => setSelectedAvatar(number)}
                        >
                          <ColoredAvatar
                            number={number}
                            char={newUser.trim().substr(0, 1)}
                          />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="center">
            <Grid item xs={10}>
              <Grid container justify="space-between">
                <Grid item>
                  <Button
                    className={classes.dialogCancelButton}
                    onClick={handleModalClose}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.dialogRegisterButton}
                    onClick={handleAddNewUser}
                    disabled={newUser.trim() === "" || selectedAvatar === 0}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <CompleteRegistrationDialog completeModalOpen={completeModalOpen} />
    </>
  );
};

export default AddUserDialog;
