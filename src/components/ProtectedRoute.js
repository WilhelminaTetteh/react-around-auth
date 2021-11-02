import React from "react";
import { Route, Redirect } from "react-router-dom";

/* takes a component as a prop, as well as any number of
props to pass down to that component */
const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {/* if loggedIn, render the given component, 
         else Redirect to login page */}
      {() =>
        props.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="./signin" />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
