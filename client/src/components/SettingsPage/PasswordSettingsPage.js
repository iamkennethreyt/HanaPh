import React, { Component } from "react";

import PropTypes from "prop-types";
import classnames from "classnames";

import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { updatePassword } from "../../actions/usersActions";

class RegisterApplicant extends Component {
  constructor() {
    super();
    this.state = {
      passowrd: "",
      password2: "",
      password3: "",
      errors: {}
    };
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

    const data = {
      password: this.state.password,
      password2: this.state.password2,
      password3: this.state.password3
    };

    this.props.updatePassword(data, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="p-2 mt-5">
        <form className="border border-light p-2" onSubmit={this.onSubmit}>
          <p className="h4 mb-4">Password Settings</p>

          <input
            type="password"
            className={classnames("form-control mt-2", {
              "is-invalid": errors.password
            })}
            placeholder="Current Password"
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
            placeholder="New Password"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
          />
          {errors.password2 && (
            <div className="invalid-feedback">{errors.password2}</div>
          )}

          <input
            type="password"
            className={classnames("form-control mt-2", {
              "is-invalid": errors.password3
            })}
            placeholder="Confirm Password"
            name="password3"
            value={this.state.password3}
            onChange={this.onChange}
          />
          {errors.password3 && (
            <div className="invalid-feedback">{errors.password3}</div>
          )}

          <button
            type="submit"
            className="btn btn-block mt-2 purple darken-3  waves-effect"
          >
            Save
          </button>

          <Link
            to="/settings"
            className="btn btn-block mt-2 btn-outline-secondary waves-effect"
          >
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

RegisterApplicant.protoTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  updatePassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  currentUser: state.users.currentUser
});

export default connect(
  mapStateToProps,
  { updatePassword }
)(withRouter(RegisterApplicant));
