import React, { Component } from "react";
import AddButton from "../AddButton/AddButton";
import { getAds } from "../../actions/adsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

class HomePage extends Component {
  componentDidMount() {
    this.props.getAds();
  }
  render() {
    // console.log(this.props.advertisements.ads);

    return (
      <div>
        <ul className="list-group mt-5">
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
                      <div className="d-flex justify-content-between">
                        <small>{add.status ? "Active" : "Not Active"}</small>

                        <Link
                          to={`/advertisement/edit/${add._id}`}
                          className=" purple-text waves-effect"
                        >
                          <i className="fa purple-text fa-1x fa-edit mr-1" />
                          edit{" "}
                        </Link>
                      </div>
                    </li>
                  );
                })
            : this.props.advertisements.ads
                .filter(add => add.status == true)
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
                      <small>by: {add.user.name}</small>
                    </li>
                  );
                })}
        </ul>
        <AddButton />
      </div>
    );
  }
}

HomePage.propTypes = {
  getAds: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  advertisements: state.ads,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAds }
)(HomePage);
