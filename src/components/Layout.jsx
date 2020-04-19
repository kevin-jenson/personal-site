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

function Layout({ children, backgroundColor = "" }) {
  const classes = useStyles();

  return (
    <div className={classes.appContainer} style={{ backgroundColor }}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
