import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const ConfirmResultDialog = ({ players, points }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Button onClick={handleModalOpen}>open dialog</Button>
      <Dialog open={modalOpen}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>just testing</DialogContentText>
          <div>
            player1 : {players[0]}, point : {points[0]}
          </div>
          <div>
            player2 : {players[1]}, point : {points[1]}
          </div>
          <div>
            player3 : {players[2]}, point : {points[2]}
          </div>
          <div>
            player4 : {players[3]}, point : {points[3]}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>modify</Button>
          <Button onClick={handleModalClose}>confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmResultDialog;
