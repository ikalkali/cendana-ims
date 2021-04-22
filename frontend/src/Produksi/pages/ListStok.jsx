import React from "react";
import Card from "./../../shared/UIElements/Card";
import ListStokTbl from "./../components/ListStokTbl";

const ListStok = (props) => {
  return (
    <React.Fragment>
      <Card header="List Stok">
        <ListStokTbl />
      </Card>
    </React.Fragment>
  );
};

export default ListStok;
