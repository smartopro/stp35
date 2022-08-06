import React from "react";
import {Redirect, Route, Switch } from "react-router-dom";

import NotFound from "../pages/NotFound/NotFound";

// data
import data from "../../assets/data";

const Router = () => (
    <Switch>
        {
            data.menuItems.map(item =>
                <Route path={item.href} key={item.href} exact>
                    <item.component />
                </Route>
            )
        }
            <Route path="/404" exact>
                <NotFound />
            </Route>
        <Redirect to="/404" />
    </Switch>
)

export default Router;
