import { useTheme } from "@material-ui/styles";

const useTypeTransition = (duration = 50) => {
  const { transitions } = useTheme();

  return index => ({
    transition: transitions.create("opacity", {
      duration,
      delay: index * 30,
    }),
    opacity: 0,
  });
};

export default useTypeTransition;
