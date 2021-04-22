import React, { useState, useEffect } from "react";
import { useTable } from "../../util/useTable";
import {
  TableRow,
  TableBody,
  TableCell,
  Typography,
  Grid,
  Button,
  ButtonGroup,
  makeStyles,
  TableContainer,
} from "@material-ui/core";
import { useHttpClient } from "./../../util/http-hook";
import LoadingSpinner from "./../../shared/UIElements/LoadingSpinner";

const headCells = [
  { id: "tanggalTransaksi", label: "Tanggal Transaksi" },
  { id: "idProjectOrder", label: "ID Project Order" },
  { id: "keterangan", label: "Masuk / Keluar" },
  { id: "karyawan.namaKaryawan", label: "Nama Karyawan" },
  { id: "komponen.namaKomponen", label: "Nama Komponen" },
  { id: "komponen.jumlahKomponen", label: "Jumlah Komponen" },
  { id: "komponen.keterangan", label: "Keterangan" },
];

const LogTransaksi = () => {
  const [records, setRecords] = useState([]);
  const [filterBarang, setFilterBarang] = useState();
  const { sendRequest, isLoading } = useHttpClient();
  const [filterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const useStyles = makeStyles((theme) => ({
    activeFilter: {
      backgroundColor: "#0130A4",
      color: "white",
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    const getKomponen = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/transaksi"
        );
        setRecords(responseData.transaksi);
      } catch (err) {}
    };
    getKomponen();
  }, [sendRequest]);

  const {
    TblContainer,
    TblHead,
    recordsAfterPagingAndSorting,
    TblPagination,
  } = useTable(records, headCells, filterFn);

  const filterBarangMasukKeluar = () => {
    if (filterBarang === "masuk") {
      return recordsAfterPagingAndSorting().filter((barang) => {
        return barang.keterangan === "masuk";
      });
    }
    if (filterBarang === "keluar") {
      return recordsAfterPagingAndSorting().filter((barang) => {
        return barang.keterangan === "keluar";
      });
    }
    return recordsAfterPagingAndSorting();
  };

  const barangMasukHandler = () => {
    setFilterBarang("masuk");
  };

  const barangKeluarHandler = () => {
    setFilterBarang("keluar");
  };

  const barangSemuaHandler = () => {
    setFilterBarang("");
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3">Log Transaksi Gudang</Typography>
        </Grid>
        <Grid item>
          {/* <Typography variant="body2">FILTER DATA</Typography> */}
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={barangMasukHandler}
              className={filterBarang === "masuk" && classes.activeFilter}
            >
              MASUK
            </Button>
            <Button
              onClick={barangKeluarHandler}
              className={filterBarang === "keluar" && classes.activeFilter}
            >
              KELUAR
            </Button>
            <Button
              onClick={barangSemuaHandler}
              className={filterBarang === "" && classes.activeFilter}
            >
              SEMUA
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      {records && (
        <TableContainer>
          <TblContainer>
            <TblHead />
            <TableBody>
              {filterBarangMasukKeluar().map((item) => {
                return (
                  <React.Fragment>
                    {item.komponen.map((k) => {
                      return (
                        <TableRow>
                          <TableCell>
                            {new Date(item.tanggalTransaksi).toDateString()}
                          </TableCell>
                          <TableCell>
                            {item.idProjectOrder
                              ? item.idProjectOrder
                              : "TRANSAKSI MANUAL"}
                          </TableCell>
                          <TableCell>{`BARANG ${item.keterangan.toUpperCase()}`}</TableCell>
                          <TableCell>
                            {item.karyawan
                              ? item.karyawan.namaKaryawan
                              : "Transaksi Manual".toUpperCase()}
                          </TableCell>
                          <TableCell>{k.namaKomponen}</TableCell>
                          <TableCell>{k.jumlahKomponen}</TableCell>
                          <TableCell>{k.keterangan}</TableCell>
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </TblContainer>
        </TableContainer>
      )}
      <TblPagination />
    </React.Fragment>
  );
};

export default LogTransaksi;
