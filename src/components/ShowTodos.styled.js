import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  completedTask: {
    content: " ",
    // position: "absolute",
    top: "50%",
    left: 0,
    borderBottom: "1px solid red",
    width: "100%",
  },
}));

export default useStyles;
