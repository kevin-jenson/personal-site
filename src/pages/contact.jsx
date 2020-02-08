import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { Mail, Pencil, Profile } from "../components/Icons";

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
  buttonContainer: {
    marginTop: theme.spacer * 4,
  },
}));

const Contact = () => {
  const classes = useStyles();
  const [{ label, Icon }, setCurrentInputProps] = React.useState({
    label: "What's your name?",
    Icon: Profile,
  });

  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    message: "",
  });

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
        <Grid container spacing={0} alignItems="flex-end">
          <Grid item xs={1}>
            <Icon />
          </Grid>
          <Grid item xs={11}>
            <TextField
              label={label}
              fullWidth
              InputProps={{ classes: { underline: classes.underlineOverride } }}
              InputLabelProps={{ classes: { root: classes.labelOverride } }}
              inputProps={{ className: classes.inputTextColor }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          justify="flex-start"
          className={classes.buttonContainer}
        >
          <Grid item xs={2}>
            <Button variant="contained">Next</Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained">Submit</Button>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Contact;
