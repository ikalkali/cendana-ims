import React, { useState, useEffect, useContext } from "react";
import Card from "../../shared/UIElements/Card";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Grid, Typography, Button, Paper } from "@material-ui/core";
import { Formik, Form, FieldArray, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { array, number, object } from "yup";
import "../../Produksi/pages/FormRequest.css";
import clsx from "clsx";
import { useHttpClient } from "./../../util/http-hook";
import { AuthContext } from "./../../Auth/auth-context";
import { withRouter } from "react-router-dom";
import { TextField as TextFieldMaterial } from "formik-material-ui";

const initialValues = {
  namaProduk: "",
  barang: [
    {
      namaKomponen: "",
      idKomponen: "",
      jumlahKomponen: "",
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
    ambilKomponen();
  }, [sendRequest]);

  const formSubmitHandler = async (event) => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/add-produk",
        "POST",
        JSON.stringify({
          namaProduk: event.namaProduk,
          komponen: event.barang,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + karyawan.token,
        }
      );
      props.history.replace(`/list-produk`);
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
                  Input Produk Baru
                </Typography>
                <Grid xs={12}>
                  <Field
                    name="namaProduk"
                    style={{ width: "100%" }}
                    type="text"
                    component={TextFieldMaterial}
                    placeholder="Nama Produk Baru"
                    variant="filled"
                  />
                </Grid>
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
                                      `barang[${index}].idKomponen`,
                                      value !== null
                                        ? value._id
                                        : initialValues.barang[index].idKomponen
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
                                xs={4}
                              >
                                <TextField
                                  id={`barang.[${index}].jumlahStok`}
                                  margin="normal"
                                  className={clsx(classes.spacingBiasa)}
                                  variant="filled"
                                  name={`barang.[${index}].jumlahStok`}
                                  label="Jumlah Komponen"
                                  onChange={(e) => {
                                    setFieldValue(
                                      `barang[${index}].jumlahKomponen`,
                                      e.target.value !== null
                                        ? e.target.value
                                        : initialValues.barang[index]
                                            .jumlahKomponen
                                    );
                                  }}
                                />
                                {/* <Field
                                  name={`barang[${index}].jumlahKomponen`}
                                  placeholder="Jumlah Komponen"
                                  type="number"
                                  component={TextFieldMaterial}
                                  variant="filled"
                                /> */}
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
                          push({ namaKomponen: "", jumlahKomponen: 0 })
                        }
                      >
                        TAMBAH
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
