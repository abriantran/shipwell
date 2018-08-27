import React, { Component } from "react";
import { connect } from "react-redux";

class MapPage extends Component {
  render() {
    const { user, origin, destination } = this.props;
    const { first_name, last_name, email, phone_number } = user;
    const API_KEY = "AIzaSyCW13eFOdUHF5YZPQjiEItUADEp2pZ5a80";

    return (
      <React.Fragment>
        <p>{`${first_name} ${last_name}`}</p>
        <p>{email}</p>
        <p>{phone_number}</p>
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
  const origin = addresses.find(address => (address.name = "From")).value;
  const destination = addresses.find(address => (address.name = "To")).value;
  return { user, origin, destination };
};

export default connect(mapStateToProps)(MapPage);
