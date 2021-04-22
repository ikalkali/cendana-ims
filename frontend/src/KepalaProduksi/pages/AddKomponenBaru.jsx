import React, { useState, useEffect, useContext } from "react";
import Card from "../../shared/UIElements/Card";
import { Grid, Typography, Button, Paper } from "@material-ui/core";
import { Formik, Form, FieldArray, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { array, number, object, string } from "yup";
import clsx from "clsx";
import { useHttpClient } from "./../../util/http-hook";
import { AuthContext } from "./../../Auth/auth-context";
import { withRouter } from "react-router-dom";
import { TextField } from "formik-material-ui";

const initialValues = {
  barang: [
    {
      namaKomponen: "",
      inisialStok: 0,
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  dropdown: {
    width: "50%",
  },
  spacingBiasa: {
    marginLeft: theme.spacing(3),
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

const AddKomponenBaru = (props) => {
  const [errorCustom] = useState();
  const { sendRequest } = useHttpClient();
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const formSubmitHandler = async (event) => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/add-komponen",
        "POST",
        JSON.stringify({
          komponen: event.barang,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      props.history.replace("/");
    } catch (err) {}
  };

  return (
    <Card header="Add Komponen Baru">
      <Paper style={{ padding: "1rem" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={object({
            barang: array(
              object({
                inisialStok: number()
                  .required("Input jumlah komponen")
                  .min(1, "Jumlah masuk harus lebih dari 1"),
                namaKomponen: string()
                  .required("Input nama komponen baru")
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
                Input komponen baru
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
                          >
                            <Grid
                              container
                              item
                              direction="column"
                              alignItems="flexStart"
                              xs={5}
                              className={classes.spacingBiasa}
                            >
                              <Field
                                name={`barang[${index}].namaKomponen`}
                                placeholder="Nama Komponen"
                                variant="filled"
                                type="text"
                                component={TextField}
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
                              xs={5}
                              className={classes.spacingBiasa}
                            >
                              <Field
                                name={`barang[${index}].inisialStok`}
                                type="number"
                                variant="filled"
                                placeholder="Jumlah Stok Awal"
                                component={TextField}
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
                            <Grid item xs={1} className={classes.spacingBiasa}>
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
                      className={classes.buttonNav}
                      size="small"
                      onClick={() =>
                        push({
                          namaKomponen: "",
                          inisialStok: 0,
                        })
                      }
                    >
                      TAMBAH
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

export default withRouter(AddKomponenBaru);
