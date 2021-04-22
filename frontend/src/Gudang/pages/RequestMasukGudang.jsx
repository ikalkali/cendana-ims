import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import CardRequest from "./../components/cardRequest";
import { useHttpClient } from "./../../util/http-hook";
import ModalRequest from "./../components/modalRequest";
import LoadingSpinner from "./../../shared/UIElements/LoadingSpinner";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";

const RequestKeGudang = (props) => {
  const { sendRequest, isLoading } = useHttpClient();
  const [dataRequest, setDataRequest] = useState([]);
  const [showModalRequest, setShowModalRequest] = useState(false);
  useEffect(() => {
    const ambilRequest = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/request"
        );
        setDataRequest(responseData.r);
      } catch (err) {}
    };
    ambilRequest();
  }, [sendRequest]);

  const filterDataReq = dataRequest.filter((r) => {
    return r.status === "pending";
  });

  const openModalHandler = () => {
    setShowModalRequest(true);
  };

  const closeModalRequest = () => {
    setShowModalRequest(false);
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
      <Typography
        style={{
          fontFamily: "Montserrat",
          fontWeight: 700,
          fontSize: "24px",
          marginBottom: "2rem",
        }}
      >
        Request Masuk
      </Typography>
      {filterDataReq.length > 0 ? (
        filterDataReq.map((r) => {
          return (
            <React.Fragment key={r._id}>
              <Route
                path={props.match.path + `/${r._id}`}
                render={() => (
                  <ModalRequest
                    show={showModalRequest}
                    onCancel={closeModalRequest}
                    idProduk={r.idProduk}
                    komponenRequest={r.komponen}
                    idRequest={r._id}
                  />
                )}
              />
              <CardRequest
                header={`Request -- ${r._id} // Request dari ${r.karyawan.namaKaryawan}`}
                headerFlex={new Date(r.tanggalRequest).toDateString()}
              >
                <div className="card-request__container">
                  <div className="card-request__table">
                    <Table size="small">
                      <TableBody>
                        {r.komponen.slice(0, 2).map((k) => {
                          return (
                            <TableRow key={k.idKomponen}>
                              <TableCell>{k.namaKomponen}</TableCell>
                              <TableCell>{k.jumlahKomponen}</TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow>
                          {r.komponen.length > 2 && (
                            <TableCell>
                              Klik detail untuk view semua komponen
                            </TableCell>
                          )}
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Grid
                      container
                      justify="flex-end"
                      style={{ padding: "1rem" }}
                    >
                      <Button
                        onClick={openModalHandler}
                        style={{ backgroundColor: "#0130a4" }}
                      >
                        <Link
                          to={`/request-masuk/${r._id}`}
                          style={{
                            textDecoration: "none",
                            color: "white",
                          }}
                        >
                          Detail
                        </Link>
                      </Button>
                    </Grid>
                  </div>
                  <div className="card-request__lower">{/* lower */}</div>
                </div>
              </CardRequest>
            </React.Fragment>
          );
        })
      ) : (
        <h2>Tidak ada request baru</h2>
      )}
    </React.Fragment>
  );
};

export default RequestKeGudang;
