import React, { Component } from "react";
import { connect } from "react-redux";

import "@material/react-material-icon/dist/material-icon.min.css";
import MaterialIcon from "@material/react-material-icon";

class MapPage extends Component {
  render() {
    const { user, origin, destination } = this.props;
    const { first_name, last_name, email, phone_number } = user;
    const API_KEY = "AIzaSyCW13eFOdUHF5YZPQjiEItUADEp2pZ5a80";

    return (
      <React.Fragment>
        <p>
          <MaterialIcon icon="person" />
          {`${first_name} ${last_name}`}
        </p>
        <p>
          <MaterialIcon icon="email" />
          {email}
        </p>
        <p>
          <MaterialIcon icon="phone" />
          {phone_number}
        </p>
        <iframe
          width="600"
          height="450"
          frameborder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/directions?origin=${encodeURIComponent(
            origin
          )}&destination=${encodeURIComponent(destination)}&key=${API_KEY}`}
          allowfullscreen
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { user, addresses } = state;
  const origin = addresses.find(({ name }) => name === "From").value;
  const destination = addresses.find(({ name }) => name === "To").value;
  return { user, origin, destination };
};

export default connect(mapStateToProps)(MapPage);
