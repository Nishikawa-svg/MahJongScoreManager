import React, { useContext, useState } from "react";
import { CommunityContext } from "../contexts/CommunityContext";
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  makeStyles,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: 30,
    margin: "20px 0px",
  },
  tablePaper: {
    margin: "0px 5px",
  },
  tableContainer: {
    [theme.breakpoints.down("sm")]: {
      maxHeight: 440,
    },
  },
  tableHeadRow: {},
  tableBodyRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#dddddd",
    },
  },
  tableHeadCell: {
    color: "#ffffff",
    backgroundColor: "#333333",
    padding: "15px 0px",
  },
  tableBodyCell: {
    padding: "5px 0px",
  },
  tablePagenation: {
    color: "#ffffff",
    backgroundColor: "#888888",
  },
}));
//order by directions
const HistoryTable = ({ history, users }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
  };

  const classes = useStyles();
  return (
    <Paper className={classes.tablePaper}>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              <TableCell className={classes.tableHeadCell} align="center">
                index
              </TableCell>
              <TableCell className={classes.tableHeadCell} align="center">
                East
              </TableCell>
              <TableCell className={classes.tableHeadCell} align="center">
                South
              </TableCell>
              <TableCell className={classes.tableHeadCell} align="center">
                West
              </TableCell>
              <TableCell className={classes.tableHeadCell} align="center">
                North
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...history]
              .reverse()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow
                  key={item.game_number}
                  className={classes.tableBodyRow}
                >
                  <TableCell className={classes.tableBodyCell} align="center">
                    {item.game_number}
                  </TableCell>
                  <TableCell className={classes.tableBodyCell} align="center">
                    <div>{users[item.east.uid].name}</div>
                    <div>{item.east.point}pt</div>
                  </TableCell>
                  <TableCell className={classes.tableBodyCell} align="center">
                    <div>{users[item.south.uid].name}</div>
                    <div>{item.south.point}pt</div>
                  </TableCell>
                  <TableCell className={classes.tableBodyCell} align="center">
                    <div>{users[item.west.uid].name}</div>
                    <div>{item.west.point}pt</div>
                  </TableCell>
                  <TableCell className={classes.tableBodyCell} align="center">
                    <div>{users[item.north.uid].name}</div>
                    <div>{item.north.point}pt</div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={classes.tablePagenation}
        component="div"
        rowsPerPageOptions={[5, 10]}
        count={history.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

//order by rank

const History = () => {
  const { history, users } = useContext(CommunityContext);
  const classes = useStyles();
  const getDate = (seconds) => {
    let date = new Date(seconds * 1000);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <>
      <div className={classes.pageTitle}>History</div>
      <Grid container justify="center">
        <Grid item xs={12} sm={10} md={10} lg={8}>
          <HistoryTable history={history} users={users} />
        </Grid>
      </Grid>
    </>
  );
};

export default History;
