import React, { Component } from "react";

import PropTypes from "prop-types";
import classnames from "classnames";

import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { registerApplicant } from "../../actions/authActions";

import { confirmAlert } from "react-confirm-alert"; // Import

class RegisterApplicant extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      contactInfo: "",
      cityProvince: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  onSuccess = () => {
    confirmAlert({
      message: "You had successfully registered an account to HanaPH",
      buttons: [
        {
          label: "Ok"
        }
      ]
    });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      contactInfo: this.state.contactInfo,
      cityProvince: this.state.cityProvince,
      password: this.state.password,
      password2: this.state.password2,
      type: "applicant"
    };

    this.props.registerApplicant(newUser, this.props.history, this.onSuccess);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="p-2 mt-5">
        <div className="text-center text-black-50 ">
          <h1 className="font-weight-bold">
            <span className="text-default">Hana</span>Ph
          </h1>
        </div>
        <form className="border border-light p-2" onSubmit={this.onSubmit}>
          <p className="h4 mb-4">Sign up as Applicant</p>

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
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}

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
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}

          <input
            type="text"
            className={classnames("form-control mt-2", {
              "is-invalid": errors.contactInfo
            })}
            placeholder="Phone Number"
            name="contactInfo"
            value={this.state.contactInfo}
            onChange={this.onChange}
          />
          {errors.contactInfo && (
            <div className="invalid-feedback">{errors.contactInfo}</div>
          )}
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
            {errors.cityProvince && (
              <div className="invalid-feedback">{errors.cityProvince}</div>
            )}
          </div>

          <hr />

          <input
            type="password"
            className={classnames("form-control mt-2", {
              "is-invalid": errors.password
            })}
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
          <input
            type="password"
            className={classnames("form-control mt-2", {
              "is-invalid": errors.password2
            })}
            placeholder="Confirm password"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
          />
          {errors.password2 && (
            <div className="invalid-feedback">{errors.password2}</div>
          )}

          <button
            type="submit"
            className="btn btn-block mt-2 teal darken-2  waves-effect"
          >
            Save
          </button>

          <Link
            to="/register"
            className="btn btn-block mt-2 btn-outline-default waves-effect"
          >
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

RegisterApplicant.protoTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerApplicant }
)(withRouter(RegisterApplicant));
