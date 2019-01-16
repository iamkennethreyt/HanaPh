import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getUser } from "../../actions/usersActions";

class AddJobAdvertisement extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      name: "",
      details: "",
      cityProvince: "",
      completeAddress: "",
      email: "",
      contactInfo: ""
    };
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.user) {
      const {
        _id,
        name,
        details,
        cityProvince,
        completeAddress,
        email,
        contactInfo
      } = nextProps.user;
      this.setState({
        _id,
        name,
        details,
        cityProvince,
        completeAddress,
        email,
        contactInfo
      });
    }
  }

  render() {
    const { name, email, details, contactInfo, cityProvince } = this.state;
    return (
      <div className="m-3 pt-5 grey-text">
        <h6 className="text-center">Emplyer Details</h6>
        <h4>{name}</h4>
        <small>{email}</small>
        <p>{details}</p>
        <strong>{contactInfo}</strong>
        <p>{cityProvince}</p>
        <button className="btn btn-outline-secondary">download resume</button>
      </div>
    );
  }
}

AddJobAdvertisement.protoTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.users.user
});

export default connect(
  mapStateToProps,
  { getUser }
)(withRouter(AddJobAdvertisement));
