import React from "react";
import { makeStyles } from "@material-ui/styles";
import { DesktopHeader as Header, Footer } from "./Navigation";

const useStyles = makeStyles(theme => ({
  appContainer: {
    backgroundColor: theme.background,
    width: "100vw",
    height: "100vh",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.appContainer}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
