import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import Layout from "../components/Layout";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center",
    margin: "20%",
    color: theme.colors.white,
  },
}));

function Blog() {
  const classes = useStyles();

  return (
    <Layout>
      <Typography className={classes.container} variant="h1">
        Sorry, no posts yet!
        <br />
        Please come check again later!
      </Typography>
    </Layout>
  );
}

export default Blog;
