import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./contexts/auth";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  }
}));

const Header = ({ title }) => {
  const [drawerIsOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();

  const { state, dispatch } = useAuth();

  const handleLogin = () => {
    dispatch({
      type: "loggedIn",
      payload: {
        name: "Luiz Almeida",
        email: "luizhrqas@gmail.com",
        dateOfBirth: new Date("1995-04-28T21:11:54"),
        company: "01dev",
        meetup: {
          name: "12º React Meetup POA",
          talk: "Context API Talk"
        }
      }
    });
  };

  const handleLogout = () => {
    dispatch({
      type: "loggedOut",
      payload: {}
    });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {!state.authenticated && (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
          {state.authenticated && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={drawerIsOpen} onClose={() => setDrawerOpen(false)}>
        <List className={classes.list}>
          <ListItem
            button
            component={NavLink}
            activeClassName={"Mui-selected"}
            to={"/"}
            exact
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {state.authenticated && (
            <ListItem
              button
              component={NavLink}
              activeClassName={"Mui-selected"}
              to={"/profile"}
              exact
            >
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItem>
          )}
          {state.authenticated && (
            <ListItem
              button
              component={NavLink}
              activeClassName={"Mui-selected"}
              to={"/settings"}
              exact
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Configurações" />
            </ListItem>
          )}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default Header;
