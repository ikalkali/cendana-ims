import React, { useState, useEffect, useContext } from "react";
import Card from "./../../shared/UIElements/Card";
import { useHttpClient } from "./../../util/http-hook";
import { AuthContext } from "./../../Auth/auth-context";
import LoadingSpinner from "./../../shared/UIElements/LoadingSpinner";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
  Typography,
} from "@material-ui/core";

const StatusRequest = () => {
  const pages = [3, 5, 10];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [listRequest, setListRequest] = useState([]);
  const { sendRequest, isLoading } = useHttpClient();
  const karyawan = useContext(AuthContext);
  useEffect(() => {
    const ambilRequest = async () => {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/request"
      );
      const requestFilter = responseData.r.filter((dataRequest) => {
        return dataRequest.karyawan.idKaryawan === karyawan.idKaryawan;
      });
      setListRequest(requestFilter);
    };
    ambilRequest();
  }, [sendRequest]);

  const statusRequestStyle = (status) => {
    if (status === "barang diambil") {
      return "diterima";
    }
    if (status === "pending") {
      return "pending";
    }
    return "approved";
  };
  const pageChangeHandler = (event, newPage) => {
    setPage(newPage);
  };

  const rowsPerPageHandler = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const productAfterPaging = () => {
    return listRequest.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };
  return (
    <React.Fragment>
      <Typography
        variant="h3"
        style={{
          fontFamily: "Montserrat",
          marginBottom: "1rem",
          fontWeight: 700,
          fontSize: "24px",
        }}
      >
        Status Request
      </Typography>
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
      {listRequest.length === 0 && !isLoading && <h2>Tidak ada data</h2>}
      {productAfterPaging().map((r) => {
        return (
          <React.Fragment>
            <Card
              header={`${r.status.toUpperCase()} -- Request ${r._id}`}
              headerFlex={new Date(r.tanggalRequest).toLocaleDateString()}
              className={`card-small`}
              status={statusRequestStyle(r.status)}
              key={r._id}
            >
              <Table>
                <TableBody>
                  {r.komponen.map((k) => {
                    return (
                      <TableRow>
                        <TableCell style={{ width: "90%" }}>
                          {k.namaKomponen}
                        </TableCell>
                        <TableCell style={{ width: "10%" }}>
                          {k.jumlahKomponen}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </React.Fragment>
        );
      })}
      <TablePagination
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        page={page}
        component="div"
        count={listRequest.length}
        onChangePage={pageChangeHandler}
        onChangeRowsPerPage={rowsPerPageHandler}
      />
    </React.Fragment>
  );
};

export default StatusRequest;
