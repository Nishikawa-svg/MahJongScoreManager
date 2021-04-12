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
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: 24,
    margin: "10px 0px",
  },
  tablePaper: {
    margin: "0px 5px",
  },
  tableContainer: {
    [theme.breakpoints.down("xs")]: {
      maxHeight: 440,
    },
  },
  tableHeadRow: {},
  tableBodyRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#eeeeee",
    },
  },
  tableHeadCell: {
    color: "#ffffff",
    fontWeight: "bold",
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
  historyDetailLink: {
    textDecoration: "none",
    color: "blue",
  },
}));
const pageRowOptionList = [5, 10, 25, 50, 100];

const HistoryTable = ({ history, users }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageRowOptionList[0]);

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
                    <Link
                      to={`/history/${item.game_number}`}
                      className={classes.historyDetailLink}
                    >
                      {item.game_number}
                    </Link>
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
        rowsPerPageOptions={pageRowOptionList}
        count={history.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const History = () => {
  const { history, users } = useContext(CommunityContext);
  const classes = useStyles();

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
