import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Header, Footer } from "./Navigation";

const useStyles = makeStyles(theme => ({
  appContainer: props => ({
    backgroundColor: theme.background[props.colorMode],
    width: "100vw",
    height: "100vh",
  }),
}));

function Layout({ children, colorMode = "dark" }) {
  const classes = useStyles({ colorMode });

  return (
    <div className={classes.appContainer}>
      <Header colorMode={colorMode} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
