import React, { Component } from "react";

import PropTypes from "prop-types";
import classnames from "classnames";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { postAd } from "../../actions/adsActions";
import { Link } from "react-router-dom";
class AddJobAdvertisement extends Component {
  constructor() {
    super();
    this.state = {
      category: "",
      title: "",
      details: "",
      status: true,
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newJob = {
      title: this.state.title,
      details: this.state.details,
      status: this.state.status,
      category: this.state.category
    };

    // console.log(newJob);
    this.props.postAd(newJob, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="m-3 pt-5 ">
        <form className="form" onSubmit={this.onSubmit}>
          <input
            type="text"
            className={classnames("form-control mt-2", {
              "is-invalid": errors.title
            })}
            placeholder="Job Title"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
          <textarea
            rows="3"
            placeholder="Job Descriptions"
            className={classnames("form-control mt-2", {
              "is-invalid": errors.details
            })}
            name="details"
            value={this.state.details}
            onChange={this.onChange}
          />
          {errors.details && (
            <div className="invalid-feedback">{errors.details}</div>
          )}

          <div className="form-group mt-2">
            <select
              id="category"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.category
              })}
              name="category"
              value={this.state.category}
              onChange={this.onChange}
            >
              <option hidden>Categories</option>
              {["Accounting/Finance", "Call Center", "Computer/IT"].map(
                option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
              )}
            </select>
            {errors.category && (
              <div className="invalid-feedback">{errors.category}</div>
            )}
          </div>

          <input
            type="submit"
            className="btn btn-block mt-2 purple darken-3  waves-effect"
            name="submit"
          />
          <Link
            to="/"
            className="btn btn-block mt-2 btn-outline-secondary waves-effect"
          >
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

AddJobAdvertisement.protoTypes = {
  postAd: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { postAd }
)(withRouter(AddJobAdvertisement));
