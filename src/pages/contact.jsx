import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

import { makeStyles, useTheme } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import emailJs from "emailjs-com";

import { TextField, Button, FormData, Loader } from "../components/Controls";
import { Mail, Pencil, Profile } from "../components/Icons";
import useEventHandler from "../custom-hooks/useEventHandler";

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
    [theme.breakpoints.down("xs")]: {
      height: theme.spacer * 18,
      alignItems: "flex-start",
      flexDirection: "column",
    },
  },
  submitState: {
    color: theme.colors.white,
    textAlign: "center",
    margin: "20%",
    [theme.breakpoints.down("xs")]: {
      margin: "10%",
    },
  },
}));

function Contact() {
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
  const { transitions } = useTheme();
  const textFieldRef = React.useRef();

  const SHOW_STATES = {
    showForm: "SHOW_FORM",
    isLoading: "IS_LOADING",
    success: "SUCCESS",
    error: "ERROR",
  };
  const [showState, setShowState] = React.useState(SHOW_STATES.showForm);

  const events = {
    focus: handleFocus,
    input: handleInput,
    next: handleNext,
    submit: handleSubmit,
  };
  const initialState = {
    data: [],
    form: { name: "", email: "", message: "" },
    Icon: Profile,
    label: "What's your name?",
    value: "name",
  };

  const [state, dispatchEvent] = useEventHandler(events, initialState);
  const { form, data, value, Icon, label } = state;

  function handleFocus(state) {
    const { data, label, Icon } = state;
    if (data.find(({ text }) => text === label)) return state;
    return {
      ...state,
      data: [...data, { Icon: Icon, text: label }],
    };
  }

  function handleInput(state, payload) {
    const { form, value } = state;

    return { ...state, form: { ...form, [value]: payload } };
  }

  function handleNext(state) {
    const { value, data, form } = state;
    if (value === "name") {
      return {
        ...state,
        label: "What's your email?",
        Icon: Mail,
        value: "email",
        data: Object.assign([], data, {
          0: { Icon: Profile, text: form.name },
        }),
      };
    } else if (value === "email") {
      return {
        ...state,
        label: "Write me a message.",
        Icon: Pencil,
        value: "message",
        data: Object.assign([], data, { 1: { Icon: Mail, text: form.email } }),
      };
    }

    textFieldRef.current.focus();
  }

  function handleSubmit(state) {
    const { form } = state;
    const SHOW_STATES = {
      showForm: "SHOW_FORM",
      isLoading: "IS_LOADING",
      success: "SUCCESS",
      error: "ERROR",
    };

    setShowState(SHOW_STATES.isLoading);

    emailJs
      .send(
        "gmail",
        "kevinjenson_dev",
        {
          user_name: form.name,
          user_email: form.email,
          user_message: form.message,
        },
        "user_wnpTxm02i1e3j9vHjJSaL"
      )
      .then(({ status }) => {
        if (status === 200) {
          setShowState(SHOW_STATES.success);
        } else {
          setShowState(SHOW_STATES.error);
        }
      })
      .catch(() => {
        setShowState(SHOW_STATES.error);
      });

    return {
      ...state,
      form: {
        name: "",
        email: "",
        message: "",
      },
      data: [],
    };
  }

  const allFormStateFilled = Object.values(form).filter(Boolean).length === 3;

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
            {data.map(({ Icon, text }) => {
              return (
                <FormData
                  key={text}
                  Icon={Icon}
                  text={text}
                  addNextData={function() {
                    dispatchEvent("FOCUS");
                  }}
                />
              );
            })}
          </div>
          <form
            onSubmit={e =>
              dispatchEvent(allFormStateFilled ? "SUBMIT" : "NEXT").prevent(e)
            }
            style={hiddenStyle}
          >
            <Grid container spacing={0} alignItems="flex-end">
              <Grid item xs={1}>
                <Icon />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label={label}
                  onInput={e =>
                    dispatchEvent({
                      event: "INPUT",
                      payload: e.target.value,
                    }).prevent(e)
                  }
                  value={form[value]}
                  onFocus={() => dispatchEvent("FOCUS")}
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
              <Grid item xs={3} sm={2}>
                <Button
                  disabled={!Boolean(form[value]) || allFormStateFilled}
                  onClick={e => dispatchEvent("NEXT").prevent(e)}
                  type={allFormStateFilled ? "button" : "submit"}
                >
                  Next
                </Button>
              </Grid>
              <Grid item xs={3} sm={2}>
                <Button
                  disabled={!allFormStateFilled}
                  onClick={e => dispatchEvent("SUBMIT").prevent(e)}
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
