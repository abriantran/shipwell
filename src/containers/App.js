import React, { Component } from "react";
import { connect } from "react-redux";
import LandingPage from "./LandingPage";
import MapPage from "./MapPage";

const App = ({ page }) => {
  switch (page) {
    case 1:
      return <LandingPage />;
    case 2:
      return <MapPage />;
  }
};

const mapStateToProps = state => {
  const { page } = state;

  return { page };
};

export default connect(mapStateToProps)(App);
