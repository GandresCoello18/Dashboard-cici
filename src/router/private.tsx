import React from "react";
import Cookies from "js-cookie";
import { Route, Redirect } from "react-router-dom";

interface Prop {
  path: string;
  component: any;
}

export function PrivateRoute({ path, component, ...rest }: Prop) {
  if (Cookies.get("id-user") === undefined) {
    return <Redirect to="/login" />;
  }
  return <Route exact path={path} component={component} {...rest} />;
}