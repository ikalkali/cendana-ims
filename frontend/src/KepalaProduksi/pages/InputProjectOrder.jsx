import React, { useEffect, useState, useContext } from "react";
import { Formik, Field, Form } from "formik";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Grid,
  Button,
  TextField as TextFieldMaterial,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import { number, object, string } from "yup";
import Card from "./../../shared/UIElements/Card";
import { useHttpClient } from "./../../util/http-hook";
import { AuthContext } from "./../../Auth/auth-context";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: "95%",
    margin: theme.spacing(2),
  },
  buttonKirim: {
    backgroundColor: "#66fe7a",
    margin: theme.spacing(2),
  },
}));

const initialValues = {
  namaProduk: "",
  idProduk: "",
  jumlahProduk: "",
  namaKonsumen: "",
  noHp: "",
  email: "",
  instansi: "",
  provinsi: "",
};

const validationSchema = object({
  namaProduk: string().required(),
  jumlahProduk: number().required(),
  namaKonsumen: string().required().min(5),
  noHp: number().required().min(6),
  email: string().required().email(),
  instansi: string().required().min(2),
});

const listProvinsi = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat ",
  "Riau ",
  "Kepulauan Riau ",
  "Jambi ",
  "Sumatera Selatan",
  "Kepulauan Bangka Belitung ",
  "Bengkulu",
  "Lampung",
  "DKI Jakarta ",
  "Banten",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Gorontalo",
  "Sulawesi Tengah",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Maluku",
  "Maluku Utara",
  "Papua Barat",
  "Papua",
];

const InputProjectOrder = (props) => {
  const { sendRequest } = useHttpClient();
  const [dataProduk, setDataProduk] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const ambilProduk = async () => {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/produk"
      );
      setDataProduk(responseData.produkReturn);
    };
    ambilProduk();
  }, [sendRequest]);

  const formSubmitHandler = async (values) => {
    console.log(values);
    await sendRequest(
      process.env.REACT_APP_BACKEND_URL + "/project-order",
      "POST",
      JSON.stringify({
        idProduk: values.idProduk,
        namaProduk: values.namaProduk,
        jumlahProduk: values.jumlahProduk,
        namaKonsumen: values.namaKonsumen,
        email: values.email,
        noHp: values.noHp,
        instansi: values.instansi,
        provinsi: values.instansi,
      }),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    );
    props.history.replace("/project-order");
  };
  const classes = useStyles();
  return (
    <Card header="Input Project Order">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          formSubmitHandler(values);
        }}
      >
        {({ values, setFieldValue, errors }) => (
          <Form>
            <Grid container direction="column">
              <Grid item>
                <Autocomplete
                  id="namaProduk"
                  name={`namaProduk`}
                  options={dataProduk}
                  className={classes.fullWidth}
                  getOptionLabel={(option) => option.namaProduk}
                  getOptionSelected={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(e, value) => {
                    console.log(errors);
                    setFieldValue(
                      `namaProduk`,
                      value !== null ? value.namaProduk : values.namaProduk
                    );
                    setFieldValue(
                      `idProduk`,
                      value !== null ? value._id : values.idProduk
                    );
                  }}
                  renderInput={(params) => (
                    <TextFieldMaterial
                      margin="normal"
                      label="Barang"
                      name={`namaProduk`}
                      {...params}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Field
                  name="jumlahProduk"
                  fullwidth
                  className={classes.fullWidth}
                  component={TextField}
                  placeholder="Jumlah Produk"
                />
              </Grid>
              <Grid item>
                <Field
                  name="namaKonsumen"
                  fullwidth
                  className={classes.fullWidth}
                  component={TextField}
                  placeholder="Nama Konsumen"
                />
              </Grid>
              <Grid item>
                <Field
                  name="noHp"
                  fullwidth
                  className={classes.fullWidth}
                  component={TextField}
                  placeholder="No HP Konsumen"
                />
              </Grid>
              <Grid item>
                <Field
                  name="email"
                  fullwidth
                  className={classes.fullWidth}
                  component={TextField}
                  placeholder="Email Konsumen"
                />
              </Grid>
              <Grid item>
                <Field
                  name="instansi"
                  fullwidth
                  className={classes.fullWidth}
                  component={TextField}
                  placeholder="Instansi"
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  id="provinsi"
                  name={`provinsi`}
                  options={listProvinsi}
                  className={classes.fullWidth}
                  getOptionLabel={(option) => option}
                  onChange={(e, value) => {
                    console.log(errors);
                    setFieldValue(
                      `provinsi`,
                      value !== null ? value : values.provinsi
                    );
                  }}
                  renderInput={(params) => (
                    <TextFieldMaterial
                      margin="normal"
                      label="Provinsi"
                      name={`namaProduk`}
                      {...params}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button type="submit" className={classes.buttonKirim}>
              Kirim
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default withRouter(InputProjectOrder);
