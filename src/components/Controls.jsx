import React from "react";

import MuiTextField from "@material-ui/core/TextField";
import MuiButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

const useTextFieldStyles = makeStyles(theme => ({
  underlineOverride: {
    "&:before": {
      borderBottom: [[1, "solid", theme.colors.white]],
    },
    "&:hover:before": {
      borderBottom: [[2, "solid", theme.colors.gray], "!important"],
    },
    "&:after": {
      borderBottom: [[2, "solid", theme.colors.pink]],
    },
  },
  labelOverride: {
    color: theme.colors.white,
    "&.Mui-focused": {
      color: theme.colors.pink,
    },
  },
  inputTextColor: {
    color: theme.colors.white,
  },
}));

export const TextField = ({ label }) => {
  const classes = useTextFieldStyles();

  return (
    <MuiTextField
      label={label}
      fullWidth
      InputProps={{ classes: { underline: classes.underlineOverride } }}
      InputLabelProps={{ classes: { root: classes.labelOverride } }}
      inputProps={{ className: classes.inputTextColor }}
    />
  );
};

export const Button = ({ children }) => {
  return <MuiButton variant="contained">{children}</MuiButton>;
};
