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

export const TextField = ({ label, onInput, value, onFocus }) => {
  const classes = useTextFieldStyles();

  const [error, setError] = React.useState(false);

  const handleBlur = () => {
    if (value) return;
    setError(true);
  };

  const handleFocus = () => {
    console.log("onFocus:", onFocus);
    onFocus();
    setError(false);
  };

  return (
    <MuiTextField
      label={label}
      fullWidth
      InputProps={{ classes: { underline: classes.underlineOverride } }}
      InputLabelProps={{ classes: { root: classes.labelOverride } }}
      inputProps={{ className: classes.inputTextColor }}
      onInput={onInput}
      value={value}
      error={error}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
};

const useButtonStyles = makeStyles(theme => ({
  rootOverride: {
    color: theme.colors.white,
    backgroundColor: theme.colors.gray,
    "&:hover": {
      backgroundColor: theme.colors.pink,
      color: theme.colors.gray,
    },
  },
  disabledOverride: {
    backgroundColor: [theme.colors.lightPink, "!important"],
  },
}));

export const Button = ({ children, ...props }) => {
  const classes = useButtonStyles({ background: "pink" });

  return (
    <MuiButton
      variant="contained"
      {...props}
      classes={{
        root: classes.rootOverride,
        disabled: classes.disabledOverride,
      }}
    >
      {children}
    </MuiButton>
  );
};

export const FormData = ({ Icon, text }) => {
  return (
    <React.Fragment>
      <Icon />
      {text}
    </React.Fragment>
  );
};
