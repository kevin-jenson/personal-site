import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";

class Fragment {
  constructor(canvas, x, y, dx, dy, fillStyle) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.fillStyle = fillStyle;
  }

  draw() {
    this.canvas.beginPath();
    this.canvas.fillStyle = this.fillStyle;
    this.canvas.fillRect(this.x, this.y, 3, 3);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

const generateFragments = (count, clientRect, fragments = []) => {
  if (count >= 10) return fragments;
  const additionalFrag = [
    ...fragments,
    new Fragment(
      canvas,
      clientRect.x,
      clientRect.y,
      Math.random() - 0.5,
      0.1,
      theme.colors.white
    ),
  ];

  generateFragments(count + 1, clientRect, additionalFrag);
};

const useStyles = makeStyles(theme => ({
  canvas: {
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "transparent",
    zIndex: 2,
  },
}));

const animate = (canvas, items, times) => {
  if (times >= 60) return;
  requestAnimationFrame(() => animate(canvas, items, times + 1));

  canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
  items.forEach((item, index) => setTimeout(() => item.update(), index * 50));
};

const Canvas = ({ homeText }) => {
  const theme = useTheme();
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current.getContext("2d");
    const [h1, h2] = homeText.current.childNodes;
    const effectH1s = (childNodes, time) => {
      if (childNodes.length === time) return;
      const child = childNodes[time];
      const clientRect = child.getBoundingClientRect();
      const fragments = generateFragments(0, clientRect);
      child.addEventListener("transitionstart", () => {
        animate(canvas, fragments, 0);
      });
    };

    h2.childNodes.forEach(child => {});
  }, []);
  const classes = useStyles();

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className={classes.canvas}
    />
  );
};

export default Canvas;
