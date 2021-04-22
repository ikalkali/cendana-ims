import React, { useState, useEffect, useContext } from "react";
import Card from "../../shared/UIElements/Card";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Grid, Typography, Button, Paper } from "@material-ui/core";
import { Formik, Form, FieldArray } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { array, number, object } from "yup";
import "./FormRequest.css";
import clsx from "clsx";
import { useHttpClient } from "./../../util/http-hook";
import { AuthContext } from "./../../Auth/auth-context";
import { withRouter } from "react-router-dom";

const initialValues = {
  idProduk: "",
  idProjectOrder: 0,
  barang: [
    {
      namaKomponen: "",
      idKomponen: "",
      jumlahKomponen: 0,
      jumlahStok: 0,
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  dropdown: {
    width: "50%",
  },
  spacingBiasa: {
    marginLeft: theme.spacing(1),
  },
  textFieldBiasa: {
    width: "20%",
  },
  buttonNav: {
    backgroundColor: "#66fe7a",
    margin: theme.spacing(2),
  },
  buttonHapus: {
    backgroundColor: "#F53838",
    color: "white",
  },
  textHack: {
    color: "white",
  },
}));

const FormRequest = (props) => {
  const [errorCustom, setErrorCustom] = useState();
  const [listKomponen, setListKomponen] = useState([]);
  const [listProjectOrder, setListProjectOrder] = useState([]);
  const [listProduk, setListProduk] = useState([]);
  const { sendRequest, error, clearError } = useHttpClient();
  const classes = useStyles();
  const karyawan = useContext(AuthContext);

  useEffect(() => {
    const ambilKomponen = async () => {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/komponen"
      );
      setListKomponen(responseData.komponen);
    };
    const ambilProduk = async () => {
      const responProduk = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/produk"
      );
      setListProduk(responProduk.produkReturn);
    };
    const ambilProjectOrder = async () => {
      const responProduk = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/project-order"
      );
      setListProjectOrder(responProduk.projectOrder);
    };
    ambilKomponen();
    ambilProduk();
    ambilProjectOrder();
  }, [sendRequest]);

  const formSubmitHandler = async (event) => {
    const requestKomponen = event.barang;
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/request",
        "POST",
        JSON.stringify({
          komponen: requestKomponen,
          idProduk: event.idProduk,
          idProjectOrder: event.idProjectOrder,
          idKaryawan: karyawan.idKaryawan,
          namaKaryawan: karyawan.namaKaryawan,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + karyawan.token,
        }
      );
      props.history.replace(`/status-request`);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card header="Form Request">
        <Paper style={{ padding: "1rem" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={object({
              barang: array(
                object({
                  jumlahKomponen: number()
                    .required("Input jumlah komponen")
                    .min(1, "Jumlah request harus lebih dari 1"),
                })
              ),
            })}
            onSubmit={async (values) => {
              formSubmitHandler(values);
            }}
          >
            {({ values, setFieldValue, errors, handleBlur, touched }) => (
              <Form className="form-request">
                <Typography className={classes.spacingBiasa} variant="body1">
                  Request Barang ke Gudang
                </Typography>
                <Autocomplete
                  id="idProjectOrder"
                  name={`idProjectOrder`}
                  options={listProjectOrder}
                  getOptionLabel={(option) =>
                    `${option.konsumen.namaKonsumen} - ${option.produk.namaProduk}`
                  }
                  className={clsx(classes.spacingBiasa)}
                  onChange={(e, value) => {
                    console.log(errors);
                    setFieldValue(
                      `idProjectOrder`,
                      value !== null ? value._id : initialValues.idProjectOrder
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      margin="normal"
                      variant="filled"
                      label="Project Order"
                      name={`idProjectOrder`}
                      {...params}
                    />
                  )}
                />
                <Autocomplete
                  id="idProduk"
                  name={`idProduk`}
                  options={listProduk}
                  getOptionLabel={(option) => option.namaProduk}
                  className={clsx(classes.spacingBiasa)}
                  onChange={(e, value) => {
                    console.log(errors);
                    setFieldValue(
                      `idProduk`,
                      value !== null ? value._id : initialValues.idProduk
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      margin="normal"
                      variant="filled"
                      label="Untuk Produk"
                      name={`idProduk`}
                      {...params}
                    />
                  )}
                />
                <FieldArray name="barang">
                  {({ remove, push }) => (
                    <div>
                      {values.barang.length > 0 &&
                        values.barang.map((barang, index) => (
                          <div className="form-request__row" key={index}>
                            <Grid
                              container
                              direction="row"
                              xs={12}
                              alignItems="center"
                              justify="center"
                            >
                              <Grid
                                container
                                item
                                direction="column"
                                alignItems="flexStart"
                                xs={6}
                              >
                                <Autocomplete
                                  id="namaKomponen"
                                  name={`barang.${index}.namaKomponen`}
                                  options={listKomponen}
                                  getOptionLabel={(option) =>
                                    option.namaKomponen
                                  }
                                  className={clsx(classes.spacingBiasa)}
                                  onChange={(e, value) => {
                                    console.log(errors);
                                    setFieldValue(
                                      `barang[${index}].namaKomponen`,
                                      value !== null
                                        ? value.namaKomponen
                                        : initialValues.barang[index]
                                            .namaKomponen
                                    );
                                    setFieldValue(
                                      `barang[${index}].jumlahStok`,
                                      value !== null
                                        ? value.stokKomponen
                                        : initialValues.barang[index].jumlahStok
                                    );
                                    setFieldValue(
                                      `barang[${index}].idKomponen`,
                                      value !== null
                                        ? value._id
                                        : initialValues.barang[index].jumlahStok
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      margin="normal"
                                      variant="filled"
                                      label="Barang"
                                      name={`barang.${index}.namaKomponen`}
                                      {...params}
                                    />
                                  )}
                                />
                                {errors &&
                                  errors.barang &&
                                  errors.barang[index] &&
                                  touched &&
                                  touched.barang &&
                                  touched.barang[index] &&
                                  touched.barang[index].jumlahKomponen && (
                                    <Typography
                                      className={clsx(
                                        classes.spacingBiasa,
                                        classes.textHack
                                      )}
                                      color="white"
                                      variant="body2"
                                    >
                                      .
                                    </Typography>
                                  )}
                              </Grid>
                              <Grid
                                container
                                item
                                direction="column"
                                alignItems="flexStart"
                                xs={2}
                              >
                                <TextField
                                  id={`barang.${index}.jumlahKomponen`}
                                  margin="normal"
                                  className={clsx(classes.spacingBiasa)}
                                  name={`barang.${index}.jumlahKomponen`}
                                  variant="filled"
                                  onBlur={handleBlur}
                                  label="Jumlah Barang"
                                  onChange={(e, value) => {
                                    if (
                                      e.target.value >
                                      values.barang[index].jumlahStok
                                    ) {
                                      setErrorCustom(
                                        "Jumlah komponen tidak boleh melebihi stok"
                                      );
                                    }
                                    if (
                                      e.target.value <=
                                      values.barang[index].jumlahStok
                                    ) {
                                      setErrorCustom("");
                                    }

                                    setFieldValue(
                                      `barang[${index}].jumlahKomponen`,
                                      e.target.value !== null
                                        ? e.target.value
                                        : initialValues.barang[index]
                                            .jumlahKomponen
                                    );
                                  }}
                                />
                                {errors &&
                                  errors.barang &&
                                  errors.barang[index] &&
                                  touched &&
                                  touched.barang &&
                                  touched.barang[index] &&
                                  touched.barang[index].jumlahKomponen && (
                                    <Typography
                                      className={classes.spacingBiasa}
                                      variant="body2"
                                      color="error"
                                    >
                                      .{errors.barang[index].jumlahKomponen}
                                    </Typography>
                                  )}
                              </Grid>
                              <Grid
                                container
                                item
                                direction="column"
                                alignItems="flexStart"
                                xs={3}
                              >
                                <TextField
                                  id={`barang.${index}.jumlahStok`}
                                  margin="normal"
                                  className={clsx(classes.spacingBiasa)}
                                  variant="filled"
                                  name={`barang.${index}.jumlahStok`}
                                  label="Jumlah Stok Tersedia"
                                  disabled
                                  value={values.barang[index].jumlahStok}
                                />
                                {errors &&
                                  errors.barang &&
                                  errors.barang[index] &&
                                  touched &&
                                  touched.barang &&
                                  touched.barang[index] &&
                                  touched.barang[index].jumlahKomponen && (
                                    <Typography
                                      className={clsx(
                                        classes.spacingBiasa,
                                        classes.textHack
                                      )}
                                      color="white"
                                      variant="body2"
                                    >
                                      .
                                    </Typography>
                                  )}
                              </Grid>
                              <Grid item xs={1}>
                                <Button
                                  text="HAPUS"
                                  className={clsx(
                                    classes.buttonNav,
                                    classes.buttonHapus
                                  )}
                                  size="small"
                                  onClick={() => remove(index)}
                                >
                                  HAPUS
                                </Button>
                              </Grid>
                            </Grid>
                          </div>
                        ))}
                      <Button
                        text="+"
                        className={classes.buttonNav}
                        size="small"
                        onClick={() =>
                          push({ namaKomponen: "", jumlah: 0, jumlahStok: 0 })
                        }
                      >
                        +
                      </Button>
                    </div>
                  )}
                </FieldArray>
                <Typography variant="body2">{errorCustom}</Typography>
                <Grid
                  container
                  xs={12}
                  alignItems="flex-end"
                  direction="column"
                >
                  <Button
                    type="submit"
                    text="Kirim"
                    className={classes.buttonNav}
                    disabled={errors.barang ? true : false}
                  >
                    Kirim
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Card>
    </React.Fragment>
  );
};

export default withRouter(FormRequest);
