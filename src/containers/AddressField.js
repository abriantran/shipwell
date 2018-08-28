import React from "react";
import { connect } from "react-redux";

import "@material/react-text-field/dist/text-field.min.css";
import TextField, { HelperText, Input } from "@material/react-text-field";

import { updateAddress, validateAddress } from "../actions";

const AddressField = ({ address, onAddressChange, onGeocodedAddressClick }) => {
  const { name, isValid, value } = address;
  const { isFetching, error, response } = isValid;
  let validationMessage;
  if (isFetching) {
    validationMessage = "Checking address…";
  } else if (error) {
    const { error_description } = error;
    validationMessage = error_description;
  } else if (response) {
    const { geocoded_address } = response;
    const { formatted_address } = geocoded_address;
    validationMessage =
      value === formatted_address ? (
        ""
      ) : (
        <span>
          Found{" "}
          <a
            style={{ cursor: "pointer", "text-decoration": "underline" }}
            onClick={() => onGeocodedAddressClick(name, formatted_address)}
          >
            {formatted_address}
          </a>
        </span>
      );
  }
  return (
    <TextField
      label={name}
      helperText={
        <HelperText isValidationMessage persistent>
          {validationMessage}
        </HelperText>
      }
    >
      <Input
        value={value}
        onChange={e => onAddressChange(name, e.target.value)}
      />
    </TextField>
  );
};

const matchDispatchToProps = dispatch => ({
  onAddressChange: (name, value) => {
    dispatch(updateAddress(name, value));
    dispatch(validateAddress(name));
  },
  onGeocodedAddressClick: (name, value) => {
    dispatch(updateAddress(name, value));
  }
});

export default connect(
  null,
  matchDispatchToProps
)(AddressField);
