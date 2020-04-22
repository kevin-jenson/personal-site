import React from "react";

import clsx from "clsx";
import { Link } from "gatsby";
import { makeStyles, useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { Twitter, LinkedIn, GitHub, Close } from "./Icons";
const Icons = { Twitter, LinkedIn, GitHub };

export function Header(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  if (matches) {
    return <MobileHeader {...props} />;
  }

  return <DesktopHeader {...props} />;
}

const useHamMenuStyles = makeStyles(({ transitions, ...theme }) => {
  return {
    hamMenu: {
      zIndex: theme.zIndex.appBar,
    },
    hamLine: {
      backgroundColor: props =>
        props.colorMode === "light" ? theme.colors.black : theme.colors.white,
      width: 50,
      height: 2,
      transition: transitions.create(["transform", "background-color"], {
        duration: transitions.duration.short,
      }),
      "&:nth-child(2)": {
        margin: [[theme.spacer * 2, 0]],
      },
      animationDuration: transitions.duration.shortest,
      animationFillMode: "forwards",
      opacity: 0,
      "&$light": {
        animationName: "$hamFadeInLight",
      },
      "&$dark": {
        animationName: "$hamFadeInDark",
      },
    },
    light: {},
    dark: {},
    "@keyframes hamFadeInLight": {
      "0%": { opacity: 0, backgroundColor: theme.colors.black },
      "90%": { opacity: 0.5, backgroundColor: theme.colors.pink },
      "100%": { opacity: 1, backgroundColor: theme.colors.black },
    },
    "@keyframes hamFadeInDark": {
      "0%": { opacity: 0, backgroundColor: theme.colors.white },
      "90%": { opacity: 0.5, backgroundColor: theme.colors.pink },
      "100%": { opacity: 1, backgroundColor: theme.colors.white },
    },
  };
});

const HamMenu = React.forwardRef(
  (
    { links, onHover = () => {}, onClick = () => {}, colorMode, className },
    ref
  ) => {
    const theme = useTheme();
    const classes = useHamMenuStyles({ colorMode });

    return (
      <div
        ref={ref}
        role="navigation"
        onClick={onClick}
        onMouseEnter={onHover}
        className={clsx(classes.hamMenu, className)}
      >
        {links.map((link, index) => {
          return (
            <div
              key={index}
              className={clsx(classes.hamLine, classes[colorMode])}
              style={{
                animationDelay: `${theme.transitions.duration.standard *
                  index}ms`,
              }}
            />
          );
        })}
      </div>
    );
  }
);

const useHeaderLinkStyles = makeStyles(({ transitions, ...theme }) => ({
  link: props => ({
    height: 50,
    width: theme.spacer * 18.25 + 2,
    opacity: 0,
    textAlign: "center",
    lineHeight: "50px",
    fontSize: 24,
    textDecoration: "none",
    color:
      props.colorMode === "light" ? theme.colors.black : theme.colors.white,
    transition: transitions.create("opacity", {
      duration: transitions.duration.complex + transitions.duration.shortest,
      delay: transitions.duration.shorter,
    }),
    "&:hover": {
      textDecoration: "underline",
    },
  }),
}));

function HeaderLink({ title, colorMode }) {
  const classes = useHeaderLinkStyles({ colorMode });

  return (
    <Link to={`/${title !== "about" ? title : ""}`} className={classes.link}>
      {title}
    </Link>
  );
}

const useHeaderStyles = makeStyles(({ transitions, ...theme }) => {
  return {
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
      }),
    },
    hamHovered: {
      transform: "rotate(90deg)",
    },
    hamLineHovered: {
      backgroundColor: [theme.colors.pink, "!important"],
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
        duration: transitions.duration.enteringScreen,
      }),
    },
    headLinksHover: {
      transform: "translate(0px, 0px)",
    },
  };
});

const links = ["about", "blog", "contact"];
export function DesktopHeader({ colorMode }) {
  const theme = useTheme();
  const classes = useHeaderStyles({ colorMode });
  const hamRef = React.useRef(null);
  const linksRef = React.useRef(null);
  const leaveTimeout = React.useRef(null);
  const enterTimeout = React.useRef(null);

  function handleMouseEnter() {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);

    hamRef.current.classList.add(classes.hamHovered);

    enterTimeout.current = setTimeout(() => {
      hamRef.current.childNodes.forEach(child =>
        child.classList.add(classes.hamLineHovered)
      );
      linksRef.current.classList.add(classes.headLinksHover);
      linksRef.current.parentNode.style.zIndex = 0;
      linksRef.current.childNodes.forEach(child => {
        child.style.opacity = 1;
      });
    }, theme.transitions.duration.shortest);
  }

  function handleMouseLeave() {
    if (enterTimeout.current) clearTimeout(enterTimeout.current);
    hamRef.current.childNodes.forEach(child =>
      child.classList.remove(classes.hamLineHovered)
    );
    linksRef.current.childNodes.forEach(child => (child.style.opacity = 0));
    linksRef.current.classList.remove(classes.headLinksHover);
    linksRef.current.parentNode.style.zIndex = -1;
    leaveTimeout.current = setTimeout(() => {
      hamRef.current.classList.remove(classes.hamHovered);
    }, theme.transitions.duration.shortest);
  }

  return (
    <div className={classes.header}>
      <HamMenu
        ref={hamRef}
        onHover={handleMouseEnter}
        links={links}
        colorMode={colorMode}
        className={classes.hamMenu}
      />
      <div
        style={{
          transform: "translate(-6px, -44px)",
          overflow: "hidden",
          zIndex: -1,
        }}
      >
        <div
          ref={linksRef}
          role="navigation"
          onMouseLeave={handleMouseLeave}
          className={classes.headerLinks}
        >
          {links.map((link, index) => {
            return (
              <HeaderLink key={index} title={link} colorMode={colorMode} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

const useDrawerStyles = makeStyles(theme => ({
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    opacity: 0,
    pointerEvents: "none",
    backgroundColor: theme.colors.gray,
    zIndex: theme.zIndex.drawer,
    width: theme.spacer * 25,
    animationFillMode: "forwards",
  },
  close: {
    opacity: 0,
    animationName: "$drawerClose",
    animationDuration: theme.transitions.duration.complex,
  },
  "@keyframes drawerClose": {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  open: {
    opacity: 1,
    pointerEvents: "all",
    animationName: "$drawerOpen",
    animationDuration: theme.transitions.duration.complex * 3,
  },
  "@keyframes drawerOpen": {
    "0%": { opacity: 1 },
    "10%": { opacity: 0 },
    "15%": { opacity: 0.8 },
    "20%": { opacity: 0 },
    "25%": { opacity: 0.6 },
    "30%": { opacity: 0 },
    "35%": { opacity: 0.7 },
    "40%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  links: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    padding: theme.spacer * 2,
  },
  link: {
    color: theme.colors.white,
    textDecoration: "none",
    margin: [[theme.spacer * 2, 0]],
  },
  divider: {
    height: 1,
    width: "70%",
    backgroundColor: theme.colors.pink,
  },
}));

function Drawer({ isOpen, links, onClose }) {
  const theme = useTheme();
  const classes = useDrawerStyles();
  const open = isOpen === "OPEN";
  console.log("open:", open);
  const closed = isOpen === "CLOSED";
  console.log("closed:", closed);

  return (
    <Paper
      className={clsx(classes.drawer, {
        [classes.open]: open,
        [classes.closed]: closed,
      })}
      elevation={3}
    >
      <div className={classes.links}>
        <Close size={50} color={theme.colors.white} onClick={onClose} />
        {links.map(link => {
          return (
            <>
              <Typography
                key={link}
                component={Link}
                to={`/${link !== "about" ? link : ""}`}
                variant="h5"
                className={classes.link}
              >
                {link}
              </Typography>
              <div className={classes.divider} />
            </>
          );
        })}
      </div>
    </Paper>
  );
}

const useMobileHeaderStyles = makeStyles(theme => ({
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    padding: [[theme.spacer * 4, theme.spacer * 3]],
    overflow: "hidden",
  },
}));

export function MobileHeader({ colorMode }) {
  const classes = useMobileHeaderStyles();
  const [isDrawerOpen, setDrawerOpen] = React.useState(null);

  function handleDrawerOpen() {
    console.log("handleDrawerOpen");
    setDrawerOpen("OPEN");
  }

  function handleDrawerClose() {
    console.log("handleDrawerClose");
    setDrawerOpen("CLOSED");
  }

  return (
    <div className={classes.header}>
      <HamMenu links={links} colorMode={colorMode} onClick={handleDrawerOpen} />
      <Drawer links={links} isOpen={isDrawerOpen} onClose={handleDrawerClose} />
    </div>
  );
}

const useFooterStyles = makeStyles(theme => ({
  footer: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    animationName: "$footerSlideUp",
    animationFillMode: "forwards",
    animationDuration: theme.transitions.duration.enteringScreen,
  },
  "@keyframes footerSlideUp": {
    from: { transform: `translateY(${theme.spacer * 8.5}px)` },
    to: { transform: `translateY(0px)` },
  },
  iconContainer: {
    width: theme.spacer * 35.5,
    height: theme.spacer * 8.5,
    backgroundColor: theme.colors.gray,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
}));

export function Footer() {
  const classes = useFooterStyles();
  const socialLinks = [
    "https://twitter.com/kevinjenson_",
    "https://www.linkedin.com/in/kevin-jenson/",
    "https://github.com/kevin-jenson",
  ];

  return (
    <footer className={classes.footer}>
      <div className={classes.iconContainer}>
        {Object.keys(Icons).map((icon, index) => {
          const Icon = Icons[icon];

          return (
            <a
              key={icon}
              aria-label={icon}
              href={socialLinks[index]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon />
            </a>
          );
        })}
      </div>
    </footer>
  );
}
