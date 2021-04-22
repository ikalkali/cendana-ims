import React, { useState, useEffect } from "react";
import { useTable } from "../../util/useTable";
import { TableRow, TableBody, TableCell } from "@material-ui/core";
import SearchBar from "../../shared/UIElements/SearchBar";
import { useHttpClient } from "./../../util/http-hook";
import Loader from "react-loader-spinner";

const headCells = [
  { id: "_id", label: "ID Komponen" },
  { id: "namaKomponen", label: "Komponen" },
  { id: "stokKomponen", label: "Jumlah Stok" },
];

const ListStokTbl = () => {
  const [records, setRecords] = useState([]);
  const { sendRequest, isLoading } = useHttpClient();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    const getKomponen = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/komponen"
        );
        setRecords(responseData.komponen);
      } catch (err) {}
    };
    getKomponen();
  }, [sendRequest]);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.namaKomponen.toLowerCase().includes(target.value)
          );
      },
    });
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
      <SearchBar label="Cari Komponen" onChange={handleSearch} />
      {records && (
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => {
              return (
                <TableRow key={item._id}>
                  <TableCell style={{ width: "15%" }}>{item._id}</TableCell>
                  <TableCell style={{ width: "70%" }}>
                    {item.namaKomponen}
                  </TableCell>
                  <TableCell style={{ width: "15%" }}>
                    {item.stokKomponen}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TblContainer>
      )}
      <TblPagination />
    </React.Fragment>
  );
};

export default ListStokTbl;
