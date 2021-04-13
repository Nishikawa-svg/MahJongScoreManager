import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  confirmButton: {
    textTransform: "none",
    marginBottom: 30,
    fontWeight: "bold",
    backgroundColor: "#ffffff",
    marginTop: 10,
    width: 120,
    height: 40,
  },
  dialogContent: {
    padding: "0px 15px",
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContentText: {
    textAlign: "center",
  },
  dialogModifyButton: {
    textTransform: "none",
    color: "red",
    border: "solid 1px",
  },
  dialogRegisterButton: {
    textTransform: "none",
    color: "blue",
    border: "solid 1px",
  },
  tableContainer: {},
  tableHeadRow: {},
  tableHeadCell: {
    color: "#ffffff",
    backgroundColor: "#333333",
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      padding: "15px 5px",
    },
  },
  tableBodyCell: {
    [theme.breakpoints.down("sm")]: {
      padding: "15px 13px",
    },
  },
  tableBodySeatCell: {
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      padding: "15px 10px",
    },
  },
}));

const directions = ["east", "south", "west", "north"];

const ConfirmResultDialog = ({
  modalOpen,
  handleModalClose,
  handleConfirm,
  handleRecodeGameResult,
  gameRecode,
  users,
}) => {
  const classes = useStyles();
  const ResultConfirmationTable = () => {
    return (
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              <TableCell className={classes.tableHeadCell} align="center">
                seat
              </TableCell>
              <TableCell className={classes.tableHeadCell} align="center">
                player
              </TableCell>
              <TableCell className={classes.tableHeadCell} align="center">
                score
              </TableCell>
              <TableCell className={classes.tableHeadCell} align="center">
                point
              </TableCell>
              <TableCell className={classes.tableHeadCell} align="center">
                rank
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {directions.map((direction) => (
              <TableRow key={direction}>
                <TableCell className={classes.tableBodySeatCell} align="center">
                  {direction}
                </TableCell>
                <TableCell className={classes.tableBodyCell} align="center">
                  {users[gameRecode[direction].uid].name}
                </TableCell>
                <TableCell className={classes.tableBodyCell} align="center">
                  {gameRecode[direction].score}
                </TableCell>
                <TableCell className={classes.tableBodyCell} align="center">
                  {gameRecode[direction].point}
                </TableCell>
                <TableCell className={classes.tableBodyCell} align="center">
                  {gameRecode[direction].rank}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      <Button
        className={classes.confirmButton}
        onClick={handleConfirm}
        variant="outlined"
        color="secondary"
      >
        confirm
      </Button>
      <Dialog open={modalOpen} className={classes.dialog} maxWidth="md">
        <DialogTitle className={classes.dialogTitle}>Confirmation</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText className={classes.dialogContentText}>
            Game Result
          </DialogContentText>
          <ResultConfirmationTable />
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-around">
            <Button
              className={classes.dialogModifyButton}
              onClick={handleModalClose}
              variant="outlined"
            >
              Modify
            </Button>
            <Button
              className={classes.dialogRegisterButton}
              onClick={handleRecodeGameResult}
            >
              Register
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmResultDialog;
