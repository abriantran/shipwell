import React, { Component } from "react";
import { connect } from "react-redux";

import "@material/react-text-field/dist/text-field.min.css";
import TextField, { HelperText, Input } from "@material/react-text-field";

import { updateAddress, validateAddress } from "../actions";

class App extends Component {
  render() {
    const { addresses, onAddressChange } = this.props;
    return (
      <div>
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
      </div>
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
