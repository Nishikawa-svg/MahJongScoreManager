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
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
const sidebarWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: sidebarWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: sidebarWidth,
  },
}));

const sidebarMenuList = [
  { name: "Home", path: "/" },
  { name: "Scoring", path: "/scoring" },
  { name: "History", path: "/history" },
  { name: "Ranking", path: "/ranking" },
  { name: "Users", path: "/users" },
];

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
              <MenuIcon />
            </ListItemIcon>
            <ListItemText>{menu.name}</ListItemText>
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <MenuIcon />
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
