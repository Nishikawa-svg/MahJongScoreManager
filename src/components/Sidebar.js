import React from "react";
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

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  const classes = useStyles();
  const sidebarContent = (
    <>
      <List>
        {sidebarMenuList.map((menu, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText>{menu.name}</ListItemText>
          </ListItem>
        ))}
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

export default Sidebar;
