import React, { useState, useEffect, useContext } from "react";
import Card from "../../shared/UIElements/Card";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Grid, Typography, Button, Paper } from "@material-ui/core";
import { Formik, Form, FieldArray } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { array, number, object, string } from "yup";
import clsx from "clsx";
import { useHttpClient } from "./../../util/http-hook";
import { AuthContext } from "./../../Auth/auth-context";
import { withRouter } from "react-router-dom";

const initialValues = {
  barang: [
    {
      namaKomponen: "",
      idKomponen: 0,
      jumlahKomponen: 0,
      keterangan: "",
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

const FormBarangKeluar = (props) => {
  const [errorCustom] = useState();
  const [listKomponen, setListKomponen] = useState([]);
  const { sendRequest } = useHttpClient();
  const classes = useStyles();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const ambilKomponen = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/komponen"
        );
        setListKomponen(responseData.komponen);
      } catch (err) {}
    };
    ambilKomponen();
  }, [sendRequest]);

  const formSubmitHandler = async (event) => {
    const komponenKeluar = event.barang;
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/barang-keluar",
        "PATCH",
        JSON.stringify({
          komponen: komponenKeluar,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      props.history.replace("/log-transaksi");
    } catch (err) {}
  };

  return (
    <Card header="Form Barang Keluar">
      <Paper style={{ padding: "1rem" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={object({
            barang: array(
              object({
                jumlahKomponen: number()
                  .required("Input jumlah komponen")
                  .min(1, "Jumlah masuk harus lebih dari 1"),
                keterangan: string()
                  .required("Keterangan keluar gudang?")
                  .min(5, "Minimal 5 karakter"),
              })
            ),
          })}
          onSubmit={(values) => {
            formSubmitHandler(values);
          }}
        >
          {({ values, setFieldValue, errors, handleBlur, touched }) => (
            <Form className="form-barang">
              <Typography className={classes.spacingBiasa} variant="body1">
                Input komponen keluar dari gudang
              </Typography>
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
                              xs={4}
                            >
                              <Autocomplete
                                id="namaKomponen"
                                name={`barang.${index}.namaKomponen`}
                                options={listKomponen}
                                getOptionLabel={(option) => option.namaKomponen}
                                className={clsx(classes.spacingBiasa)}
                                onChange={(e, value) => {
                                  console.log(errors);
                                  setFieldValue(
                                    `barang[${index}].namaKomponen`,
                                    value !== null
                                      ? value.namaKomponen
                                      : initialValues.barang[index].namaKomponen
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
                                touched.barang[index].jumlah && (
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
                                type="number"
                                onBlur={handleBlur}
                                label="Jumlah Barang"
                                onChange={(e, value) => {
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
                                touched.barang[index].jumlah && (
                                  <Typography
                                    className={classes.spacingBiasa}
                                    variant="body2"
                                    color="error"
                                  >
                                    .{errors.barang[index].jumlah}
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
                                id={`barang.${index}.jumlahStok`}
                                margin="normal"
                                className={clsx(classes.spacingBiasa)}
                                variant="filled"
                                disabled
                                name={`barang.${index}.jumlahStok`}
                                label="Jumlah Stok"
                                value={values.barang[index].jumlahStok}
                                onChange={(e, value) => {
                                  setFieldValue(
                                    `barang[${index}].jumlahStok`,
                                    e.target.value !== null
                                      ? e.target.value
                                      : initialValues.barang[index].jumlahStok
                                  );
                                }}
                              />
                              {errors &&
                                errors.barang &&
                                errors.barang[index] &&
                                touched &&
                                touched.barang &&
                                touched.barang[index] &&
                                touched.barang[index].keterangan && (
                                  <Typography
                                    className={clsx(classes.spacingBiasa)}
                                    color="error"
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
                              xs={3}
                            >
                              <TextField
                                id={`barang.${index}.keterangan`}
                                margin="normal"
                                className={clsx(classes.spacingBiasa)}
                                variant="filled"
                                name={`barang.${index}.keterangan`}
                                label="Keterangan"
                                value={values.barang[index].keterangan}
                                onChange={(e, value) => {
                                  setFieldValue(
                                    `barang[${index}].keterangan`,
                                    e.target.value !== null
                                      ? e.target.value
                                      : initialValues.barang[index].keterangan
                                  );
                                }}
                              />
                              {errors &&
                                errors.barang &&
                                errors.barang[index] &&
                                touched &&
                                touched.barang &&
                                touched.barang[index] &&
                                touched.barang[index].keterangan && (
                                  <Typography
                                    className={clsx(classes.spacingBiasa)}
                                    color="error"
                                    variant="body2"
                                  >
                                    .{errors.barang[index].keterangan}
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
                        push({
                          namaKomponen: "",
                          idKomponen: 0,
                          jumlahKomponen: 0,
                          keterangan: "",
                          jumlahStok: 0,
                        })
                      }
                    >
                      +
                    </Button>
                  </div>
                )}
              </FieldArray>
              <Typography variant="body2">{errorCustom}</Typography>
              <Grid container xs={12} alignItems="flex-end" direction="column">
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
  );
};

export default withRouter(FormBarangKeluar);
