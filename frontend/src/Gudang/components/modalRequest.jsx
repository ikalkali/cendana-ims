import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "../../shared/UIElements/Backdrop";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Typography,
} from "@material-ui/core";
import "./modalRequest.css";
import { useHttpClient } from "./../../util/http-hook";
import { AuthContext } from "./../../Auth/auth-context";

const ModalOverlay = (props) => {
  const { sendRequest } = useHttpClient();
  const [detailProduk, setDetailProduk] = useState([]);
  const auth = useContext(AuthContext);
  useEffect(() => {
    const ambilDetailProduk = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/produk/${props.idProduk}`
        );
        setDetailProduk(responseData.prod.komponenProduk);
      } catch (err) {}
    };
    ambilDetailProduk();
  }, [props.idProduk, sendRequest]);
  const approveRequestHandler = async () => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/request",
        "PATCH",
        JSON.stringify({
          komponen: props.komponenRequest,
          idRequest: props.idRequest,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
    props.history.replace("/request-masuk");
  };
  const content = (
    <div className={`modal-request ${props.className}`} style={props.style}>
      <header className={`modal-request__header ${props.headerClass}`}>
        <h3>{props.headerSub}</h3>
        <h3>Request Komponen</h3>
      </header>

      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div
          className={`modal__content__request modal-request__container ${props.contentClass}`}
        >
          <Table size="small">
            <Typography style={{ fontFamily: "Montserrat", fontWeight: 700 }}>
              Komponen yang direquest
            </Typography>
            <TableBody>
              {props.komponenRequest.map((k) => {
                return (
                  <TableRow key={k.namaKomponen}>
                    <TableCell>{k.namaKomponen}</TableCell>
                    <TableCell>{k.jumlahKomponen}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Table size="small" style={{ marginLeft: "1rem" }}>
            <Typography style={{ fontFamily: "Montserrat", fontWeight: 700 }}>
              BOM Table
            </Typography>
            <TableBody>
              {detailProduk.map((k) => {
                return (
                  <TableRow key={k.namaKomponen}>
                    <TableCell>{k.namaKomponen}</TableCell>
                    <TableCell>{k.jumlahKomponen}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
          <Button
            style={{
              backgroundColor: "#66FE7A",

              marginRight: "1rem",
              marginLeft: "1rem",
            }}
            onClick={approveRequestHandler}
          >
            APPROVE
          </Button>
          <Button
            style={{ backgroundColor: "rgb(245, 56, 56)", color: "white" }}
          >
            TOLAK
          </Button>
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const ModalRequest = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default withRouter(ModalRequest);
