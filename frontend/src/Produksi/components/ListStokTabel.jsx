import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import callRows from "./../../util/data";

const useStyles = makeStyles({
  table: {
    width: 300,
  },
});

const rows = callRows();

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        aria-label="simple table"
        style={{ width: "100%" }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Komponen</TableCell>
            <TableCell align="right">Stok</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.komponen}
              </TableCell>
              <TableCell align="right">{row.stok}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
