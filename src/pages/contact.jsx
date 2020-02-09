import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { TextField, Button } from "../components/Controls";
import { Mail, Pencil, Profile } from "../components/Icons";

const useStyles = makeStyles(theme => ({
  container: {
    color: theme.colors.white,
    width: theme.spacer * 61 + "px",
    margin: "auto",
    marginTop: theme.spacer * 10 + "px",
  },
  buttonContainer: {
    marginTop: theme.spacer * 4,
  },
  form: {
    marginTop: theme.spacer * 8,
  },
}));

const Contact = () => {
  const classes = useStyles();
  const [{ label, Icon, value }, setCurrentInputProps] = React.useState({
    label: "What's your name?",
    Icon: Profile,
    value: "name",
  });

  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleOnInput = ({ target }) => {
    setFormState({ ...formState, [value]: target.value });
  };

  const handleNext = event => {
    event.preventDefault();

    switch (value) {
      case "name":
        setCurrentInputProps({
          label: "What's your email?",
          Icon: Mail,
          value: "email",
        });
        break;
      case "email":
        setCurrentInputProps({
          label: "Write me a message.",
          Icon: Pencil,
          value: "message",
        });
        break;
      case "message":
        break;
      default:
        throw new Error(`case not found: ${value}`);
    }
  };

  const handleSend = event => {
    event.preventDefault();

    setFormState({
      name: "",
      email: "",
      message: "",
    });

    alert("sent!");
  };

  const allFormStateFilled =
    Object.values(formState).filter(Boolean).length === 3;

  return (
    <Layout>
      <SEO title="Contact Me" />
      <div className={classes.container}>
        <Typography variant="h5" component="h1">
          Shoot me an Email!
        </Typography>
        <Typography variant="body1" component="p">
          Let me know about any projects you wanna collaborate on, any
          opportunities you wanna talk to me about, or if you just wanna say
          whats up!
        </Typography>
        <p>Fill out the form below or email me at kjjenson@gmail.com.</p>
        <form
          className={classes.form}
          onSubmit={allFormStateFilled ? handleSend : handleNext}
        >
          <Grid container spacing={0} alignItems="flex-end">
            <Grid item xs={1}>
              <Icon />
            </Grid>
            <Grid item xs={11}>
              <TextField
                label={label}
                onInput={handleOnInput}
                value={formState[value]}
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
              <Button
                disabled={!Boolean(formState[value]) || allFormStateFilled}
                onClick={handleNext}
                type={allFormStateFilled ? "button" : "submit"}
              >
                Next
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                disabled={!allFormStateFilled}
                onClick={handleSend}
                type={allFormStateFilled ? "submit" : "button"}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
