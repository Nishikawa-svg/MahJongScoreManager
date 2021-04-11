import React, { useContext } from "react";
import {
  Hidden,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
// import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
// import { GiPodium } from "react-icons/gi";
import { IoPodiumOutline } from "react-icons/io5";
// import { AiFillHome } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { VscHistory } from "react-icons/vsc";
import { BsPen } from "react-icons/bs";
// import { RiGroupLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiLogoutBoxLine } from "react-icons/ri";
const sidebarWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: sidebarWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: sidebarWidth,
  },
  sidebarIcon: {
    fontSize: 24,
    color: "#312772",
  },
}));

const sidebarMenuList = [
  { name: "Home", path: "/" },
  { name: "Scoring", path: "/scoring" },
  { name: "History", path: "/history" },
  { name: "Ranking", path: "/ranking" },
  { name: "Users", path: "/users" },
];

const SelectIcon = ({ index }) => {
  const classes = useStyles();

  if (index === 0) return <GoHome className={classes.sidebarIcon} />;
  else if (index === 1) return <BsPen className={classes.sidebarIcon} />;
  else if (index === 2) return <VscHistory className={classes.sidebarIcon} />;
  else if (index === 3)
    return <IoPodiumOutline className={classes.sidebarIcon} />;
  else if (index === 4)
    return <HiOutlineUserGroup className={classes.sidebarIcon} />;

  return <></>;
};

const PrivateSidebar = ({ isSidebarOpen, closeSidebar }) => {
  const history = useHistory();
  const { logout } = useContext(AuthContext);
  const classes = useStyles();
  const handleLogout = () => {
    logout();
  };
  const handlePush = (path) => {
    history.push(path);
    closeSidebar();
  };
  const sidebarContent = (
    <>
      <List>
        {sidebarMenuList.map((menu, index) => (
          <ListItem button key={index} onClick={() => handlePush(menu.path)}>
            <ListItemIcon>
              <SelectIcon index={index} />
            </ListItemIcon>
            <ListItemText>{menu.name}</ListItemText>
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <RiLogoutBoxLine className={classes.sidebarIcon} />
          </ListItemIcon>
          <ListItemText>Log out</ListItemText>
        </ListItem>
      </List>
    </>
  );
  return (
    <>
      <Hidden smDown>
        <Drawer
          classes={{ paper: classes.drawerPaper }}
          variant="permanent"
          anchor="left"
          open
        >
          <Toolbar />
          {sidebarContent}
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          classes={{ paper: classes.drawerPaper }}
          variant="temporary"
          anchor="left"
          open={isSidebarOpen}
          onClose={closeSidebar}
        >
          {sidebarContent}
        </Drawer>
      </Hidden>
    </>
  );
};

export default PrivateSidebar;
