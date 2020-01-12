import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import { Link } from "gatsby";

const useHeaderLinkStyles = makeStyles(({ transitions, ...theme }) => ({
  link: {
    height: 50,
    width: theme.spacer * 18.25 + 2,
    opacity: 0,
    textAlign: "center",
    lineHeight: "50px",
    fontSize: 24,
    textDecoration: "none",
    color: theme.colors.white,
    transition: transitions.create("opacity", {
      duration: transitions.duration.standard,
      easing: transitions.easing.standard,
      delay: transitions.duration.shortest,
    }),
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const HeaderLink = ({ title }) => {
  const classes = useHeaderLinkStyles();

  return (
    <Link to={`/${title}`} className={classes.link}>
      {title}
    </Link>
  );
};

const useHeaderStyles = makeStyles(({ transitions, ...theme }) => ({
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    padding: [[theme.spacer * 8, theme.spacer * 6]],
    overflow: "hidden",
  },
  hamMenu: {
    transition: transitions.create("transform", {
      duration: transitions.duration.shortest,
      easing: transitions.easing.standard,
    }),
  },
  hamLine: {
    backgroundColor: theme.colors.white,
    width: 50,
    height: 2,
    transition: transitions.create(["transform", "background-color"], {
      duration: transitions.duration.shortest,
      easing: transitions.easing.standard,
    }),
    "&:nth-child(2)": {
      margin: [[theme.spacer * 2, 0]],
    },
  },
  hamHovered: {
    transform: "rotate(90deg)",
  },
  hamLineHoverd: {
    backgroundColor: theme.colors.pink,
    "&:nth-child(2)": {
      transform: `translateY(${theme.spacer * 16.25}px)`,
    },
    "&:nth-child(3)": {
      transform: `translateY(${theme.spacer * 16.25 * 2}px)`,
    },
  },
  headerLinks: {
    display: "flex",
    transform: "translate(450px, 0px)",
    transition: transitions.create("transform", {
      duration: transitions.duration.standard,
      easing: transitions.easing.standard,
    }),
  },
  headLinksHover: {
    transform: "translate(0px, 0px)",
  },
}));

export const DesktopHeader = () => {
  const theme = useTheme();
  const classes = useHeaderStyles();
  const hamRef = React.useRef(null);
  const linksRef = React.useRef(null);
  const leaveTimeout = React.useRef(null);
  const enterTimeout = React.useRef(null);
  const links = ["about", "blog", "contact"];

  const handleMouseEnter = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);

    hamRef.current.classList.add(classes.hamHovered);

    enterTimeout.current = setTimeout(() => {
      hamRef.current.childNodes.forEach(child =>
        child.classList.add(classes.hamLineHoverd)
      );
      linksRef.current.classList.add(classes.headLinksHover);
      linksRef.current.parentNode.style.zIndex = 0;
      linksRef.current.childNodes.forEach(child => {
        child.style.opacity = 1;
      });
    }, theme.transitions.duration.shortest);
  };

  const handleMouseLeave = () => {
    if (enterTimeout.current) clearTimeout(enterTimeout.current);
    hamRef.current.childNodes.forEach(child =>
      child.classList.remove(classes.hamLineHoverd)
    );
    linksRef.current.childNodes.forEach(child => (child.style.opacity = 0));
    linksRef.current.classList.remove(classes.headLinksHover);
    linksRef.current.parentNode.style.zIndex = -1;
    leaveTimeout.current = setTimeout(() => {
      hamRef.current.classList.remove(classes.hamHovered);
    }, theme.transitions.duration.shortest);
  };

  return (
    <div className={classes.header}>
      <div
        ref={hamRef}
        onMouseEnter={handleMouseEnter}
        className={classes.hamMenu}
      >
        {links.map((link, index) => {
          return <div key={index} className={classes.hamLine} />;
        })}
      </div>
      <div
        style={{
          transform: "translate(-6px, -44px)",
          overflow: "hidden",
          zIndex: -1,
        }}
      >
        <div
          ref={linksRef}
          onMouseLeave={handleMouseLeave}
          className={classes.headerLinks}
        >
          {links.map((link, index) => {
            return <HeaderLink key={index} title={link} />;
          })}
        </div>
      </div>
    </div>
  );
};
