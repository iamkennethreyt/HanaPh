import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getUser, downloadResume } from "../../actions/usersActions";

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
      contactInfo: "",
      resume: ""
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
        contactInfo,
        resume
      } = nextProps.user;
      this.setState({
        _id,
        name,
        details,
        cityProvince,
        email,
        contactInfo,
        completeAddress,
        resume
      });
    }
  }

  render() {
    const {
      name,
      email,
      details,
      contactInfo,
      cityProvince,
      _id,
      resume,
      completeAddress
    } = this.state;
    return (
      <div className="m-3 pt-5 grey-text">
        <button
          className="mt-3 btn btn-sm teal darken-2"
          onClick={() => this.props.history.goBack()}
        >
          Back
        </button>
        <h3 className="text-center">Profile Details</h3>
        <h4>
          Name : <strong>{name}</strong>
        </h4>
        <small>
          Email : <strong>{email}</strong>
        </small>
        <p>{details}</p>
        <strong>
          Phone Number : <strong>{contactInfo}</strong>
        </strong>
        <p>
          Complete Address : <strong>{completeAddress}</strong>
        </p>
        <p>
          City / Province : <strong>{cityProvince}</strong>
        </p>
        {resume === "nothing" ? null : (
          <button
            className="btn btn-outline-secondary"
            onClick={() => this.props.downloadResume(_id, name)}
          >
            download resume
          </button>
        )}
      </div>
    );
  }
}

AddJobAdvertisement.protoTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  downloadResume: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.users.user
});

export default connect(
  mapStateToProps,
  { getUser, downloadResume }
)(withRouter(AddJobAdvertisement));
