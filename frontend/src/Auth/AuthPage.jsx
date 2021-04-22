import React, { useContext } from "react";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { object, string } from "yup";
import { Grid, Button, makeStyles } from "@material-ui/core";
import "./AuthPage.css";
import { useHttpClient } from "./../util/http-hook";
import Loader from "react-loader-spinner";
import ErrorModal from "../shared/UIElements/ErrorModal";
import { AuthContext } from "./auth-context";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = object({
  email: string().email().required(),
  password: string().min(6).required(),
});

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: "100%",
  },
  btnSubmit: {
    backgroundColor: "#66fe7a",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

const AuthPage = (props) => {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const formSubmitHandler = async (values) => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/auth-login",
        "POST",
        JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      const { _id, namaKaryawan, role } = responseData.loggedIn;
      const token = responseData.token;
      auth.login(_id, role, namaKaryawan, token);
      props.history.replace("/");
    } catch (err) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Loader
        type="TailSpin"
        color="#0130a4"
        height={80}
        width={80}
        visible={isLoading}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          formSubmitHandler(values);
        }}
      >
        {() => (
          <div className="auth-page">
            <div className="auth__form">
              <div className="auth-form__header">
                <h2>Login</h2>
              </div>
              <div className="auth-form__content">
                <Form>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Field
                        name="email"
                        className={classes.fullWidth}
                        component={TextField}
                        placeholder="email"
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        name="password"
                        type="password"
                        className={classes.fullWidth}
                        component={TextField}
                        placeholder="Password"
                      />
                    </Grid>
                    <Grid>
                      <Button type="submit" className={classes.btnSubmit}>
                        LOGIN
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default AuthPage;
