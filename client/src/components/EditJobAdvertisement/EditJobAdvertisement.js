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
      category: "",
      field: "",
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
      const { details, status, title, _id, category } = nextProps.adv;
      this.setState({
        _id,
        details,
        status,
        title,
        category
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {
      _id: this.state._id,
      title: this.state.title,
      details: this.state.details,
      status: this.state.status,
      field: this.state.field,
      category: this.state.category
    };

    this.props.updateAdd(data, this.props.history);
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
              <option hidden>Category Type</option>
              {["Full Time", "Part Time"].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mt-2">
            <select
              id="field"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.field
              })}
              name="field"
              value={this.state.field}
              onChange={this.onChange}
            >
              <option hidden>Field Category</option>
              {[
                "Accounting/Finance",
                "Call Center/BPO",
                "Food/Restaurant",
                "HR/Recruitment",
                "IT/Computers",
                "Prouduction/Manufacturing"
              ].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <input
            type="submit"
            className="btn btn-block mt-2 teal darken-2  waves-effect"
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
