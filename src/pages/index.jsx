import React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/Layout";
import SEO from "../components/Seo";
import { Cursor } from "../components/Icons";
import useTypeTransition from "../custom-hooks/useTypeTransition";

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

function handleResize(target, cursorRef) {
  return function() {
    const { top, right } = target.getBoundingClientRect();
    cursorRef.current.style.top = `${top - 6}px`;
    cursorRef.current.style.left = `${right + 5}px`;
  };
}

function IndexPage() {
  const homeText = React.useRef(null);
  React.useEffect(() => {
    setTimeout(() => {
      homeText.current.childNodes.forEach(child => {
        child.childNodes.forEach(child => (child.style.opacity = 1));
      });
    }, 300);

    return () => window.removeEventListener("resize", handleResize());
  });

  const classes = useStyles();

  const h1 = "Hey, My Name is Kevin Jenson.";
  const line1 = "I'm a full stack software engineer and a UI/UX specialist";
  const line2 = "currently at CHG Healthcare.";
  const line3 = "Check out my blog posts or follow me on twitter.";
  const line4 = "Also feel free to shoot me a message @";
  const email = "kjjenson@gmail.com.";

  const lines = [h1, line1, line2, line3, line4, email];

  const typeTransition = useTypeTransition();

  function splitMap(text, addition, variant = "h5") {
    return text.split("").map((char, index) => {
      return (
        <Typography
          key={index}
          variant={variant}
          component="span"
          style={typeTransition(index + addition)}
        >
          {char}
        </Typography>
      );
    });
  }

  const cursorRef = React.useRef(null);
  function handleCursorPosition({ target }) {
    const isLast =
      target.textContent === "." &&
      target.previousElementSibling.textContent === "m";

    const { top, right } = target.getBoundingClientRect();
    cursorRef.current.style.top = `${top - 6}px`;
    cursorRef.current.style.left = `${right + (isLast ? 5 : 15)}px`;

    if (isLast) {
      cursorRef.current.classList.add(classes.cursor);
      window.addEventListener("resize", handleResize(target, cursorRef));
    }
  }

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
}

export default IndexPage;
