import React from "react";
import AppContext from "../contexts";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Error404 from "../views/ErrorPages/Error404";
import { AppRoutes } from "./routes";

function AppRouter() {
  return (
    <BrowserRouter>
      <AppContext>
        <Switch>
          {AppRoutes.map((routePath, idx) => (
            <Route {...routePath} key={"private-routes" + idx} />
          ))}
          <Route component={Error404} />
        </Switch>
      </AppContext>
    </BrowserRouter>
  );
}

export default AppRouter;
