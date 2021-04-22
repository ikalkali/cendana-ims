import React from "react";
import "./UserControl.css";
import { Button } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";

const UserControl = (props) => {
  let content;
  const logoutHandler = () => {
    props.user.logout();
    props.history.replace("/");
  };
  if (props.user.isLoggedIn === true) {
    content = (
      <React.Fragment>
        <div className="user-control">
          <h3 className="user-control__title">LOGIN SEBAGAI</h3>
          <div className="user-control__container">
            <div className="user-control__detail">
              <div className="user-control__avatar">
                <img src="https://i.ibb.co/4tKCTYp/user-Avatar.png" alt="" />
              </div>
              <div className="user-control__nama">
                <h3>{props.user.namaKaryawan}</h3>
                {props.user.role && <p>{props.user.role.toUpperCase()}</p>}
              </div>
            </div>
            <div
              className="user-control__button-container"
              style={{ marginTop: "1rem" }}
            >
              <Button
                to="/login"
                style={{
                  backgroundColor: "#f53838",
                  color: "white",
                  width: "100%",
                }}
                onClick={logoutHandler}
              >
                LOGOUT
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    content = (
      <React.Fragment>
        <div className="user-control">
          <h3 className="user-control__title">SILAKAN LOGIN</h3>
          <div className="user-control__container">
            <div className="user-control__button-container">
              <Button style={{ backgroundColor: "#66fe7a" }}>
                <Link style={{ textDecoration: "none" }} to="/login">
                  LOGIN SEBAGAI KARYAWAN
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  return <React.Fragment>{content}</React.Fragment>;
};

export default withRouter(UserControl);
