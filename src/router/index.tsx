import { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NotFound } from "../view/NotFound";
import { PubliceRoute } from "./public";
import { Home } from '../view/home';
import DashboardLayout from '../layouts/DashboardLayout';

export default function Routes() {
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
      <DashboardLayout>
        <Switch>
            <PubliceRoute path="/" component={Home} />
            <Route exact path="/404" component={NotFound} />
            <Route component={NotFound} />
        </Switch>
      </DashboardLayout>
      </BrowserRouter>
    </Suspense>
  );
}