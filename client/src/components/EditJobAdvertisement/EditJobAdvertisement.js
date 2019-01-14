import React, { Component } from "react";

import PropTypes from "prop-types";
import classnames from "classnames";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getAd, updateAdd } from "../../actions/adsActions";
import { Link } from "react-router-dom";

class AddJobAdvertisement extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      title: "",
      details: "",
      status: false,
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getAd(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.adv) {
      const { details, status, title, _id } = nextProps.adv;
      this.setState({
        _id,
        details,
        status,
        title
      });
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
    const data = {
      _id: this.state._id,
      title: this.state.title,
      details: this.state.details,
      status: this.state.status
    };

    this.props.updateAdd(data, this.props.history);
  };

  render() {
    const { errors, status } = this.state;
    console.log(status);
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
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                name="status"
                className="custom-control-input"
                id="defaultChecked2"
                defaultValue={this.state.status}
                defaultChecked={this.state.status}
              />
              <label className="custom-control-label" htmlFor="defaultChecked2">
                Status
              </label>
            </div>
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
  updateAdd: PropTypes.func.isRequired,
  getAd: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  adv: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  adv: state.ads.adv
});

export default connect(
  mapStateToProps,
  { getAd, updateAdd }
)(withRouter(AddJobAdvertisement));
