import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
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
        <form
          className="text-center border border-light p-2"
          onSubmit={this.onSubmit}
        >
          <p className="h4 mb-4">Sign in</p>
          <input
            type="text"
            className={classnames("form-control mt-2", {
              "is-invalid": errors.email
            })}
            placeholder="Your Email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}

          <input
            type="password"
            className= {classnames("form-control mt-2", {
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
          <button className="btn teal darken-2 btn-block mt-2" type="submit">
            Sign in
          </button>
          <Link
            className="btn btn-outline-default btn-block mt-2"
            to="/register"
          >
            Register
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
