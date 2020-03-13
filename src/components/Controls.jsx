import React from "react";

import MuiTextField from "@material-ui/core/TextField";
import MuiButton from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
      margin: [[0, theme.spacer, theme.spacer / 2, 0]],
      display: "inline-flex",
      alignSelf: "center",
    },
  },
}));

export const FormData = ({ Icon, text, addNextData }) => {
  const textRef = React.useRef(null);
  React.useEffect(() => {
    const [_, ...transitionText] = [...textRef.current.children];
    for (let i = 0; i < transitionText.length; i++) {
      setTimeout(() => {
        transitionText[i].style.display = "inline-block";
        if (i === transitionText.length - 1) {
          setTimeout(addNextData, 350);
        }
      }, i * 50 + 50);
    }

    return () => {
      for (let i = transitionText.length - 1; i >= 0; i--) {
        setTimeout(() => {
          transitionText[i].style.display = "none";
        }, i * 50 + 50);
      }
    };
  }, [text, textRef.current]);

  const classes = useFormDataStyles();

  return (
    <span className={classes.container} ref={textRef}>
      <Icon size={20} />
      <React.Fragment>
        {text.split("").map((char, index) => (
          <Typography
            key={char + index}
            component="span"
            style={{ display: "none" }}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </Typography>
        ))}
      </React.Fragment>
    </span>
  );
};
