import React, { Component } from "react";

import PropTypes from "prop-types";
import classnames from "classnames";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getAd, submitApplication } from "../../actions/adsActions";
import { Link } from "react-router-dom";

class AddJobAdvertisement extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      title: "",
      details: "",
      user: {
        name: "",
        details: "",
        cityProvince: "",
        completeAddress: "",
        email: "",
        contactInfo: ""
      },
      status: false,
      category: ""
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
      const { details, status, title, _id, category, user } = nextProps.adv;
      this.setState({
        _id,
        details,
        status,
        title,
        category,
        user
      });
      console.log(nextProps.adv);
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="m-3 pt-5 grey-text">
        <h3 className="text-center">{this.state.title}</h3>
        <div>
          <strong>{this.state.category}</strong>
          <p>{this.state.details}</p>
        </div>
        <hr />
        {this.props.auth.user.type === "applicant" ? (
          <div>
            <h6 className="text-center">Emplyer Details</h6>
            <h4>{user.name}</h4>
            <small>{user.email}</small>
            <p>{user.details}</p>
            <strong>{user.contactInfo}</strong>
            <p>{user.completeAddress}</p>
            <button
              className="btn btn-block btn-sm btn-outline-secondary"
              onClick={() => this.props.submitApplication(this.state._id)}
            >
              Apply THIS Advertisement
            </button>
          </div>
        ) : (
          <div>yehooo</div>
        )}
      </div>
    );
  }
}

AddJobAdvertisement.protoTypes = {
  getAd: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  adv: PropTypes.object.isRequired,
  submitApplication: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  adv: state.ads.adv
});

export default connect(
  mapStateToProps,
  { getAd, submitApplication }
)(withRouter(AddJobAdvertisement));
