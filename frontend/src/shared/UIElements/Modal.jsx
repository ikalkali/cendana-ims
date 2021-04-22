import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";
import { Typography, Grid } from "@material-ui/core";

const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <Grid container xs={10} justify="space-between" alignItems="center">
          <h2>{props.header}</h2>
          <h3
            onClick={props.onCancel}
            style={{ cursor: "pointer", fontWeight: 400 }}
          >
            {props.headerSub}X
          </h3>
        </Grid>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
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

export default Modal;
