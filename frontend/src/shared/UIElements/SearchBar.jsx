import { Grid, Toolbar } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import Controls from "./../../shared/UIElements/controls/Controls";
import React from "react";

const SearchBar = (props) => {
  return (
    <Toolbar>
      <Grid
        container
        alignItems="flex-end"
        spacing={1}
        style={{ justifyContent: "flex-end" }}
      >
        <Grid item>
          <Search />
        </Grid>
        <Grid item>
          <Controls.Input label={props.label} onChange={props.onChange} />
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default SearchBar;
