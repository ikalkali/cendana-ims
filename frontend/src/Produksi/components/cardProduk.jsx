import React, { useState, useEffect } from "react";
import Card from "../../shared/UIElements/Card";
import "./cardProduk.css";
import Button from "../../shared/UIElements/controls/Button";
import Modal from "../../shared/UIElements/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import { useHttpClient } from "./../../util/http-hook";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  detailProduk: {
    "& 	.MuiTableRow-root": {
      height: "95px",
    },
  },
}));

const CardProduk = (props) => {
  const { sendRequest } = useHttpClient();
  const [showModalProduk, setShowModalProduk] = useState(false);
  const [detailStok, setDetailStok] = useState([]);
  const detailProduk = props.items.komponenProduk;

  const arrayKomponen = [];

  detailProduk.forEach((obj) => {
    arrayKomponen.push(obj.idKomponen);
  });

  const classes = useStyles();

  useEffect(() => {
    const ambilDetailStok = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/komponen"
        );
        const filterKomponen = responseData.komponen.filter((k) => {
          return arrayKomponen.includes(k._id);
        });
        setDetailStok(filterKomponen);
      } catch (err) {}
    };
    if (showModalProduk) {
      ambilDetailStok();
    }
  }, [sendRequest, showModalProduk]);
  const openModalProdukHandler = () => {
    setShowModalProduk(true);
  };
  const closeOpenProduk = () => {
    setShowModalProduk(false);
  };
  return (
    <React.Fragment>
      <Modal
        show={showModalProduk}
        onCancel={closeOpenProduk}
        headerClass="detail-produk__title"
        header={props.items.namaProduk}
      >
        <div className={clsx(`detail-produk`, classes.detailProduk)}>
          <div className="detail-produk__material">
            <h2>MATERIAL UNTUK 1 UNIT</h2>
            <Table>
              <TableBody>
                {detailProduk.map((obj) => {
                  return (
                    <TableRow key={obj.idKomponen}>
                      <TableCell>{obj.namaKomponen}</TableCell>
                      <TableCell>{obj.jumlahKomponen}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="detail-produk__instock">
            <h2>IN-STOCK</h2>
            <Table>
              <TableBody>
                {detailStok.map((obj) => {
                  return (
                    <TableRow key={obj.idKomponen}>
                      <TableCell>{obj.namaKomponen}</TableCell>
                      <TableCell>{obj.stokKomponen}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </Modal>
      <Card className="card-kecil" footerStrip>
        <div className="list-produk">
          <div className="list-produk__nama-produk-container">
            <h3 className="list-produk__title">NAMA PRODUK</h3>
            <h2 className="list-produk__nama-produk">
              {props.items.namaProduk}
            </h2>
          </div>
          <div className="list-produk__btn-detail-produk">
            <Button
              text="Detail"
              color="#66fe7a"
              onClick={openModalProdukHandler}
            />
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default CardProduk;
