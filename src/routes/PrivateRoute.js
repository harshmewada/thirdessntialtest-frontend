import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const currentUser = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser.isLogged) {
          return <Redirect to="/login" />;
        }

        if (roles && roles.indexOf(currentUser.role) === -1) {
          return <Redirect to="/" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};
export default PrivateRoute;
