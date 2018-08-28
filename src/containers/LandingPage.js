import React, { Component } from "react";
import { connect } from "react-redux";

import "@material/react-text-field/dist/text-field.min.css";
import TextField, { HelperText, Input } from "@material/react-text-field";

import "@material/react-button/dist/button.min.css";
import Button from "@material/react-button";

import "@material/react-material-icon/dist/material-icon.min.css";
import MaterialIcon from "@material/react-material-icon";

import {
  fetchUser,
  updateAddress,
  validateAddress,
  nextPage
} from "../actions";

class LandingPage extends Component {
  componentDidMount() {
    const { fetchUser } = this.props;

    fetchUser();
  }
  render() {
    const { addresses, onAddressChange, onNextButtonClick } = this.props;

    return (
      <React.Fragment>
        {addresses.map(({ name, value, isValid }) => (
          <TextField
            label={name}
            key={name}
            helperText={
              <HelperText isValidationMessage persistent>
                {isValid.isFetching
                  ? "Checking address..."
                  : isValid.hasOwnProperty("error") &&
                    isValid.error.error_description}
              </HelperText>
            }
          >
            <Input
              value={value}
              onChange={e => onAddressChange(name, e.target.value)}
            />
          </TextField>
        ))}
        <Button
          disabled={
            !addresses.every(address =>
              address.isValid.hasOwnProperty("response")
            )
          }
          icon={<MaterialIcon icon="arrow_forward" />}
          onClick={onNextButtonClick}
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
  fetchUser: () => dispatch(fetchUser()),
  onAddressChange: (name, value) => {
    dispatch(updateAddress(name, value));
    dispatch(validateAddress(name));
  },
  onNextButtonClick: () => dispatch(nextPage())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
