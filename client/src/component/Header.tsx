import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme?: any) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  toolbarTitle: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg">
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              <Link
                component={NavLink}
                to="/"
                underline="none"
                color="textPrimary"
              >
                Blog
              </Link>
            </Typography>
            <nav>
              <Link
                color="textPrimary"
                href="#"
                className={classes.link}
                component={NavLink}
                to="/register"
              >
                Register
              </Link>
            </nav>
            <Button
              href="#"
              color="primary"
              variant="outlined"
              className={classes.link}
              component={NavLink}
              to="/auth/login"
            >
              Login
            </Button>
            <Button
              href="#"
              color="primary"
              variant="outlined"
              className={classes.link}
              component={NavLink}
              to="/auth/logout"
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Container>
    </>
  );
};

export default Header;
