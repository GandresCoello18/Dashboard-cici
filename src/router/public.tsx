import Cookies from "js-cookie";
import { Route, Redirect } from "react-router-dom";

interface Prop {
  path: string;
  component: any;
}

export function PubliceRoute({ path, component, ...rest }: Prop) {
  if (Cookies.get("access-tooken-cici") !== undefined) {
    return <Redirect to="/404" />;
  }
  return <Route exact path={path} component={component} {...rest} />;
}