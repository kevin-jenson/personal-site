import { useTheme } from "@material-ui/styles";

const useTypeTransition = () => {
  const { transitions } = useTheme();

  return index => ({
    transition: transitions.create("opacity", {
      duration: 50,
      easing: transitions.easing.standard,
      delay: index * 30,
    }),
    opacity: 0,
  });
};

export default useTypeTransition;
