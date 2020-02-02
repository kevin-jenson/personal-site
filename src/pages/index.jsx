import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/Layout";
import SEO from "../components/Seo";
import { Cursor } from "../components/Icons";

const useStyles = makeStyles(theme => ({
  homeText: {
    color: theme.colors.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: theme.spacer * 81.75,
    height: theme.spacer * 35,
    margin: [[0, "auto"]],
    position: "absolute",
    top: `calc(50% - ${(theme.spacer * 35) / 2}px)`,
    left: `calc(50% - ${(theme.spacer * 81.75) / 2}px)`,
  },
  centerText: {
    textAlign: "center",
    margin: 0,
  },
  "@keyframes cursorBlink": {
    "0%": { opacity: 0 },
    "50%": { opacity: 1 },
    "100%": { opacity: 0 },
  },
  cursor: {
    animationName: "$cursorBlink",
    animationIterationCount: "infinite",
    animationDuration: "1s",
  },
}));

const IndexPage = () => {
  const homeText = React.useRef(null);
  React.useEffect(() => {
    homeText.current.childNodes.forEach(child => {
      child.childNodes.forEach(child => (child.style.opacity = 1));
    });
  });

  const { transitions } = useTheme();
  const classes = useStyles();

  const createTypeTransition = index => ({
    transition: transitions.create("opacity", {
      duration: 50,
      easing: transitions.easing.standard,
      delay: index * 30,
    }),
    opacity: 0,
  });

  const h1 = "Hey, My Name is Kevin Jenson.";
  const line1 = `I'm a full stack software engineer and a UI/UX specialist`;
  const line2 = `currently at CHG Healthcare.`;
  const line3 = `Check out my blog posts or follow me on social media.`;
  const line4 = `Also feel free to shoot me a message @`;
  const email = `kjjenson@gmail.com.`;

  const lines = [h1, line1, line2, line3, line4, email];

  const splitMap = (text, addition, variant = "h5") => {
    return text.split("").map((char, index) => {
      return (
        <Typography
          key={index}
          variant={variant}
          component="span"
          style={createTypeTransition(index + addition)}
        >
          {char}
        </Typography>
      );
    });
  };

  const cursorRef = React.useRef(null);
  const handleCursorPosition = ({ target }) => {
    const { top, right } = target.getBoundingClientRect();
    cursorRef.current.style.top = `${top - 6}px`;
    cursorRef.current.style.left = `${right + 10}px`;
    if (
      target.textContent === "." &&
      target.previousElementSibling.textContent === "m"
    ) {
      cursorRef.current.classList.add(classes.cursor);
    }
  };

  return (
    <Layout>
      <SEO title="Home" />
      <div
        ref={homeText}
        className={classes.homeText}
        onTransitionEnd={handleCursorPosition}
      >
        {lines.map((line, index) => {
          if (index === 0) {
            return (
              <h1 aria-label={line} className={classes.centerText} key={index}>
                {splitMap(line, 0, "h1")}
              </h1>
            );
          } else {
            const additional = lines
              .slice(0, index)
              .reduce((total, current) => total + current.length, 0);

            return (
              <p aria-label={line} className={classes.centerText} key={index}>
                {splitMap(line, additional)}
              </p>
            );
          }
        })}
      </div>
      <Cursor ref={cursorRef} />
    </Layout>
  );
};

export default IndexPage;
