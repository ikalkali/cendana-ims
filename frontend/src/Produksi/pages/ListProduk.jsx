import React, { useState, useEffect } from "react";
import CardProduk from "../components/cardProduk";
import { TablePagination } from "@material-ui/core";
import Card from "../../shared/UIElements/Card";
import { useHttpClient } from "./../../util/http-hook";
import Loader from "react-loader-spinner";

const ListProduk = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const pages = [3, 5, 10];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [loadProduk, setLoadProduk] = useState();

  useEffect(() => {
    const ambilProduk = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/produk"
        );
        setLoadProduk(responseData.produkReturn);
      } catch (err) {}
    };
    ambilProduk();
  }, [sendRequest]);

  const pageChangeHandler = (event, newPage) => {
    setPage(newPage);
  };

  const rowsPerPageHandler = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const productAfterPaging = () => {
    return loadProduk.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
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
      {loadProduk && (
        <Card header="List Produk">
          {productAfterPaging().map((obj) => {
            return <CardProduk key={obj._id} items={obj} />;
          })}
          <TablePagination
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            page={page}
            component="div"
            count={loadProduk.length}
            onChangePage={pageChangeHandler}
            onChangeRowsPerPage={rowsPerPageHandler}
          />
        </Card>
      )}
    </React.Fragment>
  );
};

export default ListProduk;
