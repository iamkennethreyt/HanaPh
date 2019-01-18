import React, { Component } from "react";
import AddButton from "../AddButton/AddButton";
import { getAds, deleteAd } from "../../actions/adsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class HomePage extends Component {
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

  render() {
    return (
      <div>
        <ul className="list-group mt-5 mb-5">
          {this.props.advertisements.ads.length === 0 ? (
            <h4 className="text-center mt-3">No advertisements yet</h4>
          ) : (
            <h4 className="text-center mt-3">List of Advertisement</h4>
          )}
          {this.props.auth.user.type === "employer"
            ? this.props.advertisements.ads
                .filter(ads => this.props.auth.user.id === ads.user._id)
                .map((add, key) => {
                  return (
                    <li
                      key={key}
                      className="list-group-item list-group-item-action flex-column align-items-start"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-2 h5">{add.title}</h5>
                        <small>{moment(add.date).format("LL")}</small>
                      </div>
                      <p className="mb-2">{add.details}</p>
                      <small className="grey-text">
                        Category : {add.category}
                      </small>
                      <div className="d-flex justify-content-between">
                        <div
                          className="grey-text d-text waves-effect"
                          onClick={this.onDelete.bind(this, add._id)}
                        >
                          <i className="fa grey-text fa-1x fa-trash mr-1" />{" "}
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
                          className=" purple-text waves-effect"
                        >
                          <i className="fa purple-text fa-1x fa-edit mr-1" />{" "}
                          <small>Edit</small>
                        </Link>
                      </div>
                    </li>
                  );
                })
            : this.props.advertisements.ads
                .filter(add => add.status === true)
                .map((add, key) => {
                  return (
                    <li
                      key={key}
                      className="list-group-item list-group-item-action flex-column align-items-start"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-2 h5">{add.title}</h5>
                        <small>{moment(add.date).format("LL")}</small>
                      </div>
                      <small className="grey-text">
                        Category : {add.category}
                      </small>
                      <p className="mb-2">{add.details}</p>
                      <div className="d-flex w-100 justify-content-between">
                        <small>by: {add.user.name}</small>
                        <Link
                          to={`/advertisement/view/${add._id}`}
                          className="grey-text d-text waves-effect"
                        >
                          <i className="fa grey-text fa-1x fa-eye mr-1" />{" "}
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
