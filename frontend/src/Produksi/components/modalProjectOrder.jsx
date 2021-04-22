import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "../../shared/UIElements/Backdrop";
import "../../shared/UIElements/Modal.css";
import { Grid, Typography, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  subtitle__po: {
    fontWeight: 700,
  },
  spacing__po: {
    margin: theme.spacing(1),
  },
  title__po: {
    fontWeight: 700,
    fontFamily: "Montserrat",
    fontSize: 24,
    marginLeft: theme.spacing(1),
    color: "white",
  },
}));

const ModalOverlay = (props) => {
  const classes = useStyles();
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <Grid container justify="space-between" xs={10}>
          <Typography className={classes.title__po}>Project Order</Typography>
          <Typography
            style={{ fontWeight: 400, cursor: "pointer" }}
            className={classes.title__po}
            onClick={props.onCancel}
          >
            X
          </Typography>
        </Grid>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              container
              xs={12}
              direction="row"
              justify="space-between"
            >
              <Grid
                item
                container
                xs={2}
                direction="column"
                className={classes.spacing__po}
              >
                <Grid item>
                  <Typography className={classes.subtitle__po}>
                    TANGGAL ORDER
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {new Date(props.items.tanggalOrder).toDateString()}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={2}
                direction="column"
                className={classes.spacing__po}
              >
                <Grid item>
                  <Typography className={classes.subtitle__po}>NAMA</Typography>
                </Grid>
                <Grid item>
                  <Typography>{props.items.konsumen.namaKonsumen}</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={2}
                direction="column"
                className={classes.spacing__po}
              >
                <Grid item>
                  <Typography className={classes.subtitle__po}>
                    INSTANSI
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {props.items.konsumen.instansi.namaInstansi}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={2}
                direction="column"
                className={classes.spacing__po}
              >
                <Grid item>
                  <Typography className={classes.subtitle__po}>
                    PROVINSI
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {props.items.konsumen.instansi.provinsi}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* START BARIS 2 */}

            <Grid item container xs={12} direction="row">
              <Grid
                item
                container
                xs={4}
                direction="column"
                className={classes.spacing__po}
              >
                <Grid item>
                  <Typography className={classes.subtitle__po}>
                    NO HP
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>{props.items.konsumen.hpKonsumen}</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={3}
                direction="column"
                className={classes.spacing__po}
              >
                <Grid item>
                  <Typography className={classes.subtitle__po}>
                    EMAIL
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>{props.items.konsumen.emailKonsumen}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} direction="row">
              <Grid
                item
                container
                xs={4}
                direction="column"
                className={classes.spacing__po}
              >
                <Grid item>
                  <Typography className={classes.subtitle__po}>
                    NAMA PRODUK
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>{props.items.produk.namaProduk}</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={4}
                direction="column"
                className={classes.spacing__po}
              >
                <Grid item>
                  <Typography className={classes.subtitle__po}>
                    JUMLAH PRODUK
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {`${props.items.produk.jumlahProduk} UNIT`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* START BUTTON ORDER SELESAI */}
            {props.role === "admin" || props.role === "kepalaGudang" ? (
              <Grid item>
                <Button
                  onClick={() => props.handleOrderSelesai(props.items._id)}
                  style={{
                    backgroundColor: "#0130a4",
                    color: "white",
                    padding: "1rem",
                  }}
                >
                  ORDER SELESAI
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const ModalProjectOrder = (props) => {
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

export default ModalProjectOrder;
