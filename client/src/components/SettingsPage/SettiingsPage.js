import React, { Component } from "react";

import PropTypes from "prop-types";
import classnames from "classnames";

import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { getCurrentUser, updateCurrentUser } from "../../actions/usersActions";

class RegisterApplicant extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      contactInfo: "",
      cityProvince: "",
      completeAddress: "",
      details: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentUser();
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.currentUser) {
      const {
        name,
        email,
        contactInfo,
        cityProvince,
        completeAddress,
        details
      } = nextProps.currentUser;
      this.setState({
        name,
        email,
        contactInfo,
        cityProvince,
        completeAddress,
        details
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      contactInfo: this.state.contactInfo,
      cityProvince: this.state.cityProvince,
      completeAddress: this.state.completeAddress,
      details: this.state.details
    };

    this.props.updateCurrentUser(data, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="p-2 mt-5">
        <form className="border border-light p-2" onSubmit={this.onSubmit}>
          <p className="h4 mb-4">Account Settings</p>

          {this.props.auth.user.type === "Applicant" ? (
            <input
              type="text"
              className={classnames("form-control mt-2", {
                "is-invalid": errors.name
              })}
              placeholder="Full name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          ) : (
            <input
              type="text"
              className={classnames("form-control mt-2", {
                "is-invalid": errors.name
              })}
              placeholder="Company Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          )}

          <input
            type="email"
            className={classnames("form-control mt-2", {
              "is-invalid": errors.email
            })}
            placeholder="Email Address"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />

          <input
            type="text"
            className={classnames("form-control mt-2", {
              "is-invalid": errors.contactInfo
            })}
            placeholder="Contact Info"
            name="contactInfo"
            value={this.state.contactInfo}
            onChange={this.onChange}
          />

          <div className="form-group mt-2">
            <select
              id="cityProvince"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.cityProvince
              })}
              name="cityProvince"
              value={this.state.cityProvince}
              onChange={this.onChange}
            >
              <option hidden>City/Province</option>
              {["Cebu", "Bohol", "Samar", "Leyte", "Manila", "davao"].map(
                option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
              )}
            </select>
          </div>

          {this.props.auth.user.type === "applicant" ? (
            <textarea
              rows="3"
              placeholder="Complete address"
              className={classnames("form-control mt-2", {
                "is-invalid": errors.completeAddress
              })}
              name="completeAddress"
              value={this.state.completeAddress}
              onChange={this.onChange}
            />
          ) : (
            <div>
              <textarea
                rows="3"
                placeholder="Company complete address"
                className={classnames("form-control mt-2", {
                  "is-invalid": errors.completeAddress
                })}
                name="completeAddress"
                value={this.state.completeAddress}
                onChange={this.onChange}
              />
              <textarea
                rows="3"
                placeholder="Company Details"
                className={classnames("form-control mt-2", {
                  "is-invalid": errors.details
                })}
                name="details"
                value={this.state.details}
                onChange={this.onChange}
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-block mt-2 purple darken-3  waves-effect"
          >
            Save
          </button>

          <Link
            to="/"
            className="btn btn-block mt-2 btn-outline-secondary waves-effect"
          >
            Cancel
          </Link>

          <Link
            to="/settings/password"
            className="btn btn-block mt-2 purple darken-3 waves-effect"
          >
            Password Settings
          </Link>
        </form>
      </div>
    );
  }
}

RegisterApplicant.protoTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  updateCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  currentUser: state.users.currentUser
});

export default connect(
  mapStateToProps,
  { getCurrentUser, updateCurrentUser }
)(withRouter(RegisterApplicant));
