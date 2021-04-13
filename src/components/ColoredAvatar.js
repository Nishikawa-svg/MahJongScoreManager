import { Avatar, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  avatarRed: {
    backgroundColor: "#fa1010",
  },
  avatarBlue: {
    backgroundColor: "#3500d3",
  },
  avatarGreen: {
    backgroundColor: "#14a76c",
  },
  avatarYellow: {
    backgroundColor: "#fba100",
  },
  avatarPurpul: {
    backgroundColor: "#8860d0",
  },
  avatarGray: {
    backgroundColor: "#474853",
  },
}));
const ColoredAvatar = ({ number, char }) => {
  const classes = useStyles();
  switch (number) {
    case 1:
      return <Avatar className={classes.avatarRed}>{char}</Avatar>;
    case 2:
      return <Avatar className={classes.avatarGreen}>{char}</Avatar>;
    case 3:
      return <Avatar className={classes.avatarBlue}>{char}</Avatar>;
    case 4:
      return <Avatar className={classes.avatarYellow}>{char}</Avatar>;
    case 5:
      return <Avatar className={classes.avatarPurpul}>{char}</Avatar>;
    case 6:
      return <Avatar className={classes.avatarGray}>{char}</Avatar>;
    default:
      return null;
  }
};

export default ColoredAvatar;
