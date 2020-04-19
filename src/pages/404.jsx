import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/Seo";
import { BabyYoda } from "../components/Icons";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

function NotFoundPage() {
  const classes = useStyles();

  return (
    <Layout backgroundColor="#88aba1">
      <SEO title="404: Not found" />
      <div className={classes.container}>
        <h1>Uh Oh! This page doesn't exist.</h1>
        <BabyYoda size="60%" />
        <h2>
          <Link to="/">Go back home</Link>
        </h2>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
