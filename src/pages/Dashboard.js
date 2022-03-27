import React from "react";
import { Box, CssBaseline } from "@mui/material";
import DashSidebar from "../components/DashSidebar";

import NavBar from "../components/Menu";
import makeStyles from "@mui/styles/makeStyles";
import Users from "../pages/Users";
import Products from "../pages/Products";
import PrivateRoute from "../routes/PrivateRoute";
import { Redirect, useHistory } from "react-router-dom";
import UserActivity from "./UserActivity";
import { useDispatch, useSelector } from "react-redux";

const DashBoard = () => {
  const classes = useStyles();

  const DashList = [
    {
      component: () => <Redirect to="/users" />,
      path: "/",
      roles: ["superadmin"],
    },
    {
      component: () => <Redirect to="/products" />,
      path: "/",
      roles: ["user"],
    },
    {
      component: Users,
      path: "/users",
      roles: ["superadmin"],
    },

    {
      component: Products,
      path: "/products",
      roles: ["user"],
    },
  ];

  return (
    <Box style={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        style={{ width: 280, flexShrink: 0 }}
        aria-label="mailbox folders"
      >
        <DashSidebar />
      </Box>
      <Box style={{ width: "100%", height: "100%" }}>
        <NavBar />
        <div className={classes.container}>
          {DashList.map((item, index) => {
            const Component = item.component;
            return (
              <PrivateRoute
                roles={item.roles}
                key={index}
                exact
                path={item.path}
                component={Component}
              />
            );
          })}
          <PrivateRoute
            roles={"superadmin"}
            exact
            path={`/useractivity/:id`}
            component={UserActivity}
          />
        </div>
      </Box>
    </Box>
  );
};
export default DashBoard;
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.white,
    padding: theme.spacing(3),
    paddingTop: 110,
    height: "100%",
    width: "100%",
  },
  box: {
    backgroundColor: "white",
    borderRadius: 10,
    height: "100%",
    padding: 20,
    margin: 20,
  },
}));
