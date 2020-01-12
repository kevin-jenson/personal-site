import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/Layout";
import SEO from "../components/Seo";
import Canvas from "../components/Canvas";

const useStyles = makeStyles(theme => ({
  homeText: {
    color: theme.colors.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: theme.spacer * 65,
    height: theme.spacer * 35,
    margin: [[0, "auto"]],
    position: "absolute",
    top: `calc(50% - ${(theme.spacer * 35) / 2}px)`,
    left: `calc(50% - ${(theme.spacer * 65) / 2}px)`,
  },
  centerText: {
    textAlign: "center",
  },
}));

const IndexPage = () => {
  const homeText = React.useRef(null);
  React.useEffect(() => {
    const [h1, h2] = homeText.current.childNodes;
    h1.childNodes.forEach(child => (child.style.opacity = 1));
    h2.childNodes.forEach(child => (child.style.opacity = 1));
  });

  const { transitions } = useTheme();
  const classes = useStyles();

  const createTypeTransition = index => ({
    transition: transitions.create("opacity", {
      duration: 50,
      easing: transitions.easing.standard,
      delay: index * 25,
    }),
    opacity: 0,
  });

  const h1 = "Hey, My Name is Kevin Jenson.";
  const body = `I'm a full stack software engineer and a UI/UX specialist currently at CHG Healthcare.
  Check out my blog posts or follow me on social media.
  Also feel free to shoot me a message @ kjjenson@gmail.com.`;

  return (
    <Layout>
      <SEO title="Home" />
      <div ref={homeText} className={classes.homeText}>
        <h1 aria-label={h1} className={classes.centerText}>
          {h1.split("").map((char, index) => {
            return (
              <Typography
                key={index}
                variant="h1"
                component="span"
                style={createTypeTransition(index)}
              >
                {char}
              </Typography>
            );
          })}
        </h1>
        <h2 aria-label={body} className={classes.centerText}>
          {body.split("").map((char, index) => {
            return (
              <Typography
                key={index}
                variant="h5"
                component="span"
                style={createTypeTransition(index + h1.length)}
              >
                {char}
              </Typography>
            );
          })}
        </h2>
      </div>
      <Canvas homeText={homeText} />
    </Layout>
  );
};

export default IndexPage;
