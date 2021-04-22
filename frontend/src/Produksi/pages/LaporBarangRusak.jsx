import React from "react";
import { Formik, Field, Form } from "formik";
import Autocomplete from "@material-ui/lab/Autocomplete";
import callRows from "../../util/data";
import { TextField, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextField as TextFieldFormik } from "formik-material-ui";
import { number, object, string } from "yup";
import Card from "../../shared/UIElements/Card";

const initialValues = {
  namaBarang: "",
  jumlahBarang: "",
  keterangan: "",
};

const listBarang = callRows();

const validationSchema = object({
  namaBarang: string().required().min(1),
  jumlahBarang: number().required().min(1),
  keterangan: string().required().min(5).max(20),
});

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

const LaporBarangRusak = () => {
  const classes = useStyles();
  return (
    <Card header="Form Barang Rusak">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue, errors }) => (
          <Form>
            <Grid container direction="column" xs={12}>
              <Grid item>
                <Autocomplete
                  id="namaBarang"
                  name={`namaBarang`}
                  options={listBarang}
                  className={classes.fullWidth}
                  getOptionLabel={(option) => option.komponen}
                  onChange={(e, value) => {
                    console.log(errors);
                    setFieldValue(
                      `namaBarang`,
                      value !== null ? value.komponen : values.namaBarang
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      margin="normal"
                      label="Barang"
                      name={`namaBarang`}
                      {...params}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Field
                  name="jumlahBarang"
                  fullwidth
                  className={classes.fullWidth}
                  component={TextFieldFormik}
                  placeholder="Jumlah"
                />
              </Grid>
              <Grid item>
                <Field
                  name="keterangan"
                  fullwidth
                  className={classes.fullWidth}
                  component={TextFieldFormik}
                  placeholder="Keterangan"
                />
              </Grid>
              <Grid container alignItems="flex-end" direction="column">
                <Button
                  type="submit"
                  text="Kirim"
                  className={classes.buttonKirim}
                  color="primary"
                  // onClick={() => console.log(values)}
                >
                  Kirim
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default LaporBarangRusak;
