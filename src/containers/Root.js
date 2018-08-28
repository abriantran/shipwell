import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import configureStore from "../configureStore";
import LandingPage from "./LandingPage";
import MapPage from "./MapPage";
import "./Root.css";

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/map" component={MapPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
