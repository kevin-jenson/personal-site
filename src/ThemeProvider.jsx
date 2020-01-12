import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  ThemeProvider as MuiThemeProvider,
  makeStyles,
} from "@material-ui/styles";
import theme from "../theme";

const useStyles = makeStyles({
  "@global": {
    body: {
      overflow: "hidden",
    },
  },
});

const ThemeProvider = ({ children }) => {
  useStyles();

  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </>
  );
};

export default ThemeProvider;
