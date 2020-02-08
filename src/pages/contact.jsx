import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  container: {
    color: theme.colors.white,
    width: theme.spacer * 61 + "px",
    margin: "auto",
    marginTop: theme.spacer * 10 + "px",
  },
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

const Contact = () => {
  const classes = useStyles();

  return (
    <Layout>
      <SEO title="Contact Me" />
      <div className={classes.container}>
        <h1>Shoot me an Email!</h1>
        <p>
          Let me know about any projects you wanna collaborate on, any
          opportunities you wanna talk to me about, or if you just wanna say
          whats up!
        </p>
        <p>Fill out the form below or email me at kjjenson@gmail.com.</p>
        <TextField
          label="Name"
          fullWidth
          InputProps={{ classes: { underline: classes.underlineOverride } }}
          InputLabelProps={{ classes: { root: classes.labelOverride } }}
          inputProps={{ className: classes.inputTextColor }}
        />
      </div>
    </Layout>
  );
};

export default Contact;
