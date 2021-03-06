import { createMuiTheme } from "@material-ui/core/styles";

const colors = {
  black: "#0A100D",
  white: "#F2F4F3",
  gray: "#40434E",
  lightPink: "#A39BA8",
  pink: "#C297B8",
  babyYoda: {
    green: "#B1CDAF",
    brown: "#9B8B7B",
    lightBrown: "#CECAAC",
  },
};

const theme = createMuiTheme({
  colors,
  background: {
    dark: colors.black,
    light: colors.white,
  },
  spacer: 8,
  typography: {
    h1: {
      fontSize: 36,
      fontWeight: 700,
    },
  },
});

export default theme;
