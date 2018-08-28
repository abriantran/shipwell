import React, { Component } from "react";
import { connect } from "react-redux";

import "@material/react-button/dist/button.min.css";
import Button from "@material/react-button";

import "@material/react-material-icon/dist/material-icon.min.css";
import MaterialIcon from "@material/react-material-icon";

import { fetchUser } from "../actions";

import AddressField from "./AddressField";

class LandingPage extends Component {
  componentDidMount() {
    const { fetchUser } = this.props;

    fetchUser();
  }
  render() {
    const { addresses, history } = this.props;

    return (
      <React.Fragment>
        {addresses.map(address => (
          <AddressField address={address} key={address.name} />
        ))}
        <Button
          disabled={
            !addresses.every(address =>
              address.isValid.hasOwnProperty("response")
            )
          }
          icon={<MaterialIcon icon="arrow_forward" />}
          onClick={() => history.push("/map")}
        >
          Next
        </Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { addresses } = state;

  return { addresses };
};

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
