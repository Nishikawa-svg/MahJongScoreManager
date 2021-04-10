import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const ConfirmResultDialog = ({
  modalOpen,
  handleModalClose,
  handleConfirm,
  handleRecodeGameResult,
  players,
  scores,
}) => {
  return (
    <>
      <Button onClick={handleConfirm}>confirm</Button>
      <Dialog open={modalOpen}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>just testing</DialogContentText>
          <div>
            player1 : {players[0]}, point : {scores[0]}
          </div>
          <div>
            player2 : {players[1]}, point : {scores[1]}
          </div>
          <div>
            player3 : {players[2]}, point : {scores[2]}
          </div>
          <div>
            player4 : {players[3]}, point : {scores[3]}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>modify</Button>
          <Button onClick={handleRecodeGameResult}>confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmResultDialog;
