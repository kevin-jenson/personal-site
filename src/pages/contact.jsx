import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

import { makeStyles, useTheme } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import emailJs from "emailjs-com";

import { TextField, Button, FormData, Loader } from "../components/Controls";
import { Mail, Pencil, Profile } from "../components/Icons";

const useStyles = makeStyles(theme => ({
  container: {
    color: theme.colors.white,
    width: theme.spacer * 61,
    margin: "auto",
    marginTop: theme.spacer * 10,
    [theme.breakpoints.down("md")]: {
      width: "80vw",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
    },
  },
  buttonContainer: {
    marginTop: theme.spacer * 4,
  },
  formData: {
    height: theme.spacer * 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  submitState: {
    color: theme.colors.white,
    textAlign: "center",
    margin: "20%",
  },
}));

function Contact() {
  const { transitions } = useTheme();
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    if (containerRef.current) {
      for (let i = 0; i < containerRef.current.childNodes.length; i++) {
        if (i === 3) continue;
        const child = containerRef.current.childNodes[i];

        child.style.transition = transitions.create(["opacity", "transform"], {
          duration: transitions.duration.short,
        });
        setTimeout(() => {
          child.style.opacity = 1;
          child.style.transform = "scale(1)";
        }, (i === 4 ? 3 : i) * transitions.duration.short);
      }
    }
  });

  const classes = useStyles();
  const textFieldRef = React.useRef();
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

  const SHOW_STATES = {
    showForm: "SHOW_FORM",
    isLoading: "IS_LOADING",
    success: "SUCCESS",
    error: "ERROR",
  };
  const [showState, setShowState] = React.useState(SHOW_STATES.showForm);

  const [formData, setFormData] = React.useReducer((state, action) => {
    switch (action.type) {
      case "ADD_FORM_DATA":
        if (state.find(({ text }) => text === label)) return state;
        return [...state, { Icon, text: label }];
      case "UPDATE_NAME":
        return Object.assign([], state, {
          0: { Icon: state[0].Icon, text: formState.name },
        });
      case "UPDATE_EMAIL":
        return Object.assign([], state, {
          1: { Icon: state[1].Icon, text: formState.email },
        });
      case "CLEAR_DATA":
        return [];
      default:
        throw new Error(
          `type: ${action.type} not found for setFormData reducer`
        );
    }
  }, []);

  function handleFocus() {
    setFormData({ type: "ADD_FORM_DATA" });
  }

  function handleOnInput({ target }) {
    setFormState({ ...formState, [value]: target.value });
  }

  function handleNext(event) {
    event.preventDefault();

    switch (value) {
      case "name":
        setFormData({ type: "UPDATE_NAME" });
        setCurrentInputProps({
          label: "What's your email?",
          Icon: Mail,
          value: "email",
        });
        break;
      case "email":
        setFormData({ type: "UPDATE_EMAIL" });
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

    textFieldRef.current.focus();
  }

  async function handleSend(event) {
    event.preventDefault();
    const { name, email, message } = formState;

    setShowState(SHOW_STATES.isLoading);

    const emailResult = await emailJs.send(
      "gmail",
      "kevinjenson_dev",
      {
        user_name: name,
        user_email: email,
        user_message: message,
      },
      "user_wnpTxm02i1e3j9vHjJSaL"
    );

    setShowState(
      emailResult.status === 200 ? SHOW_STATES.success : SHOW_STATES.error
    );

    setFormState({
      name: "",
      email: "",
      message: "",
    });

    setFormData({ type: "CLEAR_DATA" });
  }

  const allFormStateFilled =
    Object.values(formState).filter(Boolean).length === 3;

  const hiddenStyle = {
    opacity: 0,
    transformOrigin: "0px 0px 0px",
    transform: "scale(0.75)",
  };

  if (showState === SHOW_STATES.showForm) {
    return (
      <Layout>
        <SEO title="Contact Me" />
        <div className={classes.container} ref={containerRef}>
          <Typography variant="h5" component="h1" style={hiddenStyle}>
            Shoot me an Email!
          </Typography>
          <Typography variant="body1" component="p" style={hiddenStyle}>
            Let me know about any projects you wanna collaborate on, any
            opportunities you wanna talk to me about, or if you just wanna say
            whats up!
          </Typography>
          <p style={hiddenStyle}>
            Fill out the form below or email me at kjjenson@gmail.com.
          </p>
          <div className={classes.formData}>
            {formData.map(({ Icon, text }) => {
              return (
                <FormData
                  key={text}
                  Icon={Icon}
                  text={text}
                  addNextData={() => setFormData({ type: "ADD_FORM_DATA" })}
                />
              );
            })}
          </div>
          <form
            onSubmit={allFormStateFilled ? handleSend : handleNext}
            style={hiddenStyle}
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
                  onFocus={handleFocus}
                  ref={textFieldRef}
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
  }

  if (showState === SHOW_STATES.isLoading) {
    return (
      <Layout>
        <Loader size={300} />
      </Layout>
    );
  }

  if (showState === SHOW_STATES.success) {
    return (
      <Layout>
        <Typography className={classes.submitState} variant="h1">
          Thanks for taking the time to E-mail me!
          <br />
          I'll get back to you soon, you can follow me on Twitter or go check
          out my blog posts!
        </Typography>
      </Layout>
    );
  }

  if (showState === SHOW_STATES.error) {
    return (
      <Layout>
        <Typography className={classes.submitState} variant="h1">
          Uh oh!
          <br />
          It looks like something went wrong.
          <br />
          Please try again later, or feel free to shoot me an email directly at
          kjjenson@gmail.com.
        </Typography>
      </Layout>
    );
  }
}

export default Contact;
