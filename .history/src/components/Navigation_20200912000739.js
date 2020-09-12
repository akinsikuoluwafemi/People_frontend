import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Login from "../pages/Login";
import CreateRequest from '../pages/CreateRequest';

export default function Navigation() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route/>
      </Switch>
    </Router>
  );
}
