import React, { Component } from "react";
import "@material/react-text-field/dist/text-field.css";
import TextField, { HelperText, Input } from "@material/react-text-field";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { value: "", isValid: false };
  }

  handleChange = e => this.setState({ value: e.target.value });

  render() {
    const { value, isValid } = this.state;
    return (
      <div>
        <TextField
          label="To"
          helperText={
            <HelperText>{isValid ? "" : "This address is invalid"}</HelperText>
          }
        >
          <Input value={value} onChange={this.handleChange} />
        </TextField>
      </div>
    );
  }
}

export default App;
