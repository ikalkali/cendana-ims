import React, { useContext } from "react";
import NavLinks from "./NavLinks";
import UserControl from "./UserControl";
import { Grid, makeStyles } from "@material-ui/core";
import "./MainNavigation.css";
import { AuthContext } from "./../../Auth/auth-context";

const useStyles = makeStyles((theme) => ({
  buttonNav: {
    "& .MuiButton-root": {
      color: "white",
      backgroundColor: "#f53838",
      margin: theme.spacing(1),
    },
  },
}));

const MainNavigation = () => {
  const karyawanLoggedIn = useContext(AuthContext);
  const classes = useStyles();
  return (
    <React.Fragment>
      <nav className="main-navigation">
        <div className="extender"></div>
        <h3 className="main-navigation__brand">CENDANA2000</h3>
        <hr />
        <NavLinks role={karyawanLoggedIn.role} />
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
          className={classes.buttonNav}
        ></Grid>
        <UserControl user={karyawanLoggedIn} />
      </nav>
    </React.Fragment>
  );
};

export default MainNavigation;
