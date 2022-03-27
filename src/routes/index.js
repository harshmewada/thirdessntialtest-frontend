import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Snack from "../components/Snack";
import useAutoLogin from "../hooks/useAutoLogin";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
const AppRoutes = () => {
  const ready = useAutoLogin();
  const isLogged = useSelector((state) => state.user.isLogged);
  return (
    <BrowserRouter>
      <Snack />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/" component={Dashboard} />
    </BrowserRouter>
  );
};

export default AppRoutes;
