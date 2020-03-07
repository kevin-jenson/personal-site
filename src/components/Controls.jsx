import React from "react";

import MuiTextField from "@material-ui/core/TextField";
import MuiButton from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import useTypeTransition from "../custom-hooks/useTypeTransition";

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

export const TextField = React.forwardRef(
  ({ label, onInput, value, onFocus }, ref) => {
    const classes = useTextFieldStyles();

    const [error, setError] = React.useState(false);

    const handleBlur = () => {
      if (value) return;
      setError(true);
    };

    const handleFocus = () => {
      onFocus();
      setError(false);
    };

    return (
      <MuiTextField
        label={label}
        fullWidth
        InputProps={{ classes: { underline: classes.underlineOverride } }}
        InputLabelProps={{ classes: { root: classes.labelOverride } }}
        inputProps={{ className: classes.inputTextColor, ref }}
        onInput={onInput}
        value={value}
        error={error}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    );
  }
);

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
  const classes = useButtonStyles();

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

const useFormDataStyles = makeStyles(theme => ({
  container: {
    marginRight: theme.spacer * 2,
    display: "flex",
    "&>svg": {
      marginRight: theme.spacer,
    },
  },
}));

export const FormData = ({ Icon, text, onTransitionEnd }) => {
  const textRef = React.useRef(null);
  React.useEffect(() => {
    const [_, ...text] = [...textRef.current.children];
    text.forEach(char => {
      console.log("char.style.opacity:", char.style.opacity, char.textContent);
      char.style.opacity = 1;
    });
  });

  const classes = useFormDataStyles();
  const typeTransition = useTypeTransition();

  return (
    <span
      className={classes.container}
      ref={textRef}
      onTransitionEnd={onTransitionEnd}
    >
      <Icon size={20} />
      <React.Fragment>
        {text.split("").map((char, index) => (
          <Typography
            key={char + index}
            component="span"
            style={typeTransition(index)}
          >
            {char}
          </Typography>
        ))}
      </React.Fragment>
    </span>
  );
};
