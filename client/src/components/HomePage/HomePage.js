import React, { Component } from "react";
import AddButton from "../AddButton/AddButton";
import { getAds, deleteAd } from "../../actions/adsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Fuse from "fuse.js";

const options = {
  caseSensitive: true,
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 0,
  keys: ["title", "details", "category"]
};

class HomePage extends Component {
  state = {
    title: ""
  };
  componentDidMount() {
    this.props.getAds();
  }

  onDelete = id => {
    confirmAlert({
      message: "Are you sure to delete this advertisement?",
      buttons: [
        {
          label: "Ok",
          onClick: () => this.props.deleteAd(id)
        },
        {
          label: "Cancel"
        }
      ]
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const fused = new Fuse(this.props.advertisements.ads, options);
    let advertisements = fused.search(this.state.title);

    if (this.state.title === "") {
      advertisements = this.props.advertisements.ads;
    }
    return (
      <div>
        <ul className="list-group mt-5 mb-5">
          {this.props.advertisements.ads.length === 0 ? (
            <h4 className="text-center mt-3">No advertisements yet</h4>
          ) : (
            <div className="container">
              <h4 className="text-center mt-3">List of Jobs</h4>
              <div className="md-form mt-0">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                />
              </div>
            </div>
          )}
          {this.props.auth.user.type === "employer"
            ? advertisements
                .filter(ads => this.props.auth.user.id === ads.user._id)
                .map((add, key) => {
                  return (
                    <li
                      key={key}
                      className="list-group-item list-group-item-action flex-column align-items-start"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-2 h5">
                          {add.category} {add.title}
                        </h5>
                        <small>{moment(add.date).format("LL")}</small>
                      </div>
                      <p className="mb-2">{add.details}</p>
                      {add.applicants.length === 0 ? null : (
                        <p className="m-1 text-primary">
                          {add.applicants.length} new applicant(s)
                        </p>
                      )}
                      <small className="grey-text">Field : {add.field}</small>
                      <div className="d-flex justify-content-between">
                        <div
                          className="red-text d-text waves-effect"
                          onClick={this.onDelete.bind(this, add._id)}
                        >
                          <i className="fa  fa-1x fa-trash mr-1" />{" "}
                          <small>Delete</small>
                        </div>
                        <Link
                          to={`/advertisement/view/${add._id}`}
                          className="grey-text d-text waves-effect"
                        >
                          <i className="fa grey-text fa-1x fa-eye mr-1" />{" "}
                          <small>View</small>
                        </Link>
                        <Link
                          to={`/advertisement/edit/${add._id}`}
                          className=" text-default waves-effect"
                        >
                          <i className="fa text-default fa-1x fa-edit mr-1" />{" "}
                          <small>Edit</small>
                        </Link>
                      </div>
                    </li>
                  );
                })
            : advertisements.map((add, key) => {
                return (
                  <li
                    key={key}
                    className="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-2 h5">
                        {add.category} {add.title}
                      </h5>
                      <small>{moment(add.date).format("LL")}</small>
                    </div>
                    <small className="grey-text">Field : {add.field}</small>

                    <p className="mb-2">{add.details}</p>
                    <div className="d-flex w-100 justify-content-between">
                      <p>
                        <small>by: {add.user.name}</small>
                        {/* <Link
                          to={`/profile/${add.user._id}`}
                          className="badge badge-secondary badge-pill"
                        >
                          View profile
                        </Link> */}
                      </p>
                      <Link
                        to={`/advertisement/view/${add._id}`}
                        className="text-default d-text waves-effect"
                      >
                        <i className="fa text-default fa-1x fa-eye mr-1" />{" "}
                        <small>View</small>
                      </Link>
                    </div>
                  </li>
                );
              })}
        </ul>
        {this.props.auth.user.type === "employer" ? <AddButton /> : null}
      </div>
    );
  }
}

HomePage.propTypes = {
  getAds: PropTypes.func.isRequired,
  deleteAd: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  advertisements: state.ads,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAds, deleteAd }
)(HomePage);
