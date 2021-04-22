import React from "react";
import { TextField, makeStyles } from "@material-ui/core";

export default function Input(props) {
  const useStyles = makeStyles({
    root: {
      outline: "none",
    },
  });

  const classes = useStyles();
  const { name, label, value, error = null, onChange, ...other } = props;
  return (
    <TextField
      variant="standard"
      label={label}
      classes={{ root: classes.root }}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
