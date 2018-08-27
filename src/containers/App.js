import React, { Component } from "react";
import { connect } from "react-redux";

import "@material/react-text-field/dist/text-field.min.css";
import TextField, { HelperText, Input } from "@material/react-text-field";

import "@material/react-button/dist/button.css";
import Button from "@material/react-button";

import { updateAddress, validateAddress } from "../actions";

class App extends Component {
  render() {
    const { addresses, onAddressChange } = this.props;
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
  onAddressChange: (name, value) => {
    dispatch(updateAddress(name, value));
    dispatch(validateAddress(name));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
