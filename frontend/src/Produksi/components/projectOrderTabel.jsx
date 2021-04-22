import React, { useState, useEffect, useContext } from "react";
import { useTable } from "../../util/useTable";
import {
  TableRow,
  TableBody,
  TableCell,
  Button,
  TableContainer,
  Paper,
} from "@material-ui/core";
import { Link, Route, withRouter } from "react-router-dom";
import { useHttpClient } from "./../../util/http-hook";
import ModalProjectOrder from "./modalProjectOrder";
import Loader from "react-loader-spinner";
import { AuthContext } from "./../../Auth/auth-context";

const headCells = [
  { id: "id", label: "ID Project Order" },
  { id: "produk", label: "Produk" },
  { id: "jmlProduk", label: "Jumlah" },
  { id: "nama", label: "Nama Pemesan" },
  { id: "email", label: "Email" },
  { id: "hp", label: "Telepon" },
  { id: "detail", label: "" },
];

const ProjectOrderTabel = (props) => {
  const [records, setRecords] = useState([]);
  const [showModalRequest, setShowModalRequest] = useState(false);
  const [filterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { sendRequest, isLoading } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const ambilProjectOrder = async () => {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/project-order"
      );
      let filteredProjectOrder;
      if (props.filter !== "semua") {
        filteredProjectOrder = responseData.projectOrder.filter((projOrder) => {
          return projOrder.status === props.filter;
        });
      } else {
        console.log("semua");
        filteredProjectOrder = responseData.projectOrder;
      }
      setRecords(filteredProjectOrder);
    };
    ambilProjectOrder();
  }, [sendRequest, props.filter]);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const openModalHandler = () => {
    setShowModalRequest(true);
  };

  const closeModalRequest = () => {
    setShowModalRequest(false);
  };

  const handleOrderSelesai = async (projId) => {
    try {
      sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/project-order",
        "PATCH",
        JSON.stringify({ projId: projId }),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      props.history.replace("/project-order");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <Loader
        type="TailSpin"
        color="#0130a4"
        height={80}
        width={80}
        visible={isLoading}
      />
      <TableContainer component={Paper}>
        <TblContainer>
          <TblHead />
          <TableBody>
            {records &&
              recordsAfterPagingAndSorting().map((item) => {
                return (
                  <React.Fragment key={item._id}>
                    <Route
                      path={props.match.path + `/${item._id}`}
                      render={() => (
                        <ModalProjectOrder
                          show={showModalRequest}
                          onCancel={closeModalRequest}
                          items={item}
                          headerClass="header__po"
                          handleOrderSelesai={handleOrderSelesai}
                          role={auth.role}
                        />
                      )}
                    />
                    <TableRow>
                      <TableCell>{item._id}</TableCell>
                      <TableCell>{item.produk.namaProduk}</TableCell>
                      <TableCell>{item.produk.jumlahProduk}</TableCell>
                      <TableCell>{item.konsumen.namaKonsumen}</TableCell>
                      <TableCell>{item.konsumen.emailKonsumen}</TableCell>
                      <TableCell>{item.konsumen.hpKonsumen}</TableCell>
                      <TableCell>
                        <Link
                          to={`/project-order/${item._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            onClick={openModalHandler}
                            text="Detail"
                            style={{ backgroundColor: "#66FE7A", padding: 8 }}
                          >
                            Detail
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
          </TableBody>
        </TblContainer>
      </TableContainer>
      <TblPagination />
    </React.Fragment>
  );
};

export default withRouter(ProjectOrderTabel);
