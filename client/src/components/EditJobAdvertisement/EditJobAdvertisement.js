import React, { Component } from "react";

import PropTypes from "prop-types";
import classnames from "classnames";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getAd } from "../../actions/adsActions";
import { Link } from "react-router-dom";
class EditJobAdvertisement extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      details: "",
      status: true,
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getAd(this.props.match.params.id);
  }

  //   onChange = e => {
  //     this.setState({ [e.target.name]: e.target.value });
  //   };

  //   onChange = e => {
  //     this.setState({ [e.target.name]: e.target.value });
  //   };

  //   onSubmit = e => {
  //     e.preventDefault();

  //     const newJob = {
  //       title: this.state.title,
  //       details: this.state.details,
  //       status: this.state.status
  //     };

  //     this.props.postAd(newJob, this.props.history);
  //   };

  render() {
    // const { errors } = this.state;
    // const { ads } = this.props.ads;
    console.log(this.props.adv.ads);
    return (
      <div className="m-3 pt-5 ">
        {/* <form className="form" onSubmit={this.onSubmit}>
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
            rows="2"
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

          <div className="d-flex justify-content-between">
            <label className="mt-2 mb-0 bs-switch ">
              <input type="checkbox" />
              <span className="slider  purple darken-3 round" />
            </label>
            <span className="mt-3 mb-0">Status(Active)</span>
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
        </form> */}
      </div>
    );
  }
}

EditJobAdvertisement.protoTypes = {
  getAd: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  adv: state
});

export default connect(
  mapStateToProps,
  { getAd }
)(withRouter(EditJobAdvertisement));
