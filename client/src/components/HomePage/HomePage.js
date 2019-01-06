import React, { Component } from "react";
import AddButton from "../AddButton/AddButton";
import { getAds } from "../../actions/adsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
                .filter(ads => this.props.auth.user.id === ads.user)
                .map((add, key) => {
                  return (
                    <li
                      key={key}
                      className="list-group-item list-group-item-action flex-column align-items-start"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-2 h5">{add.title}</h5>
                        <small>January 25, 2019</small>
                      </div>
                      <p className="mb-2">{add.details}</p>
                      <small>SWULutions</small>
                    </li>
                  );
                })
            : this.props.advertisements.ads.map((add, key) => {
                return (
                  <li
                    key={key}
                    className="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-2 h5">{add.title}</h5>
                      <small>January 25, 2019</small>
                    </div>
                    <p className="mb-2">{add.details}</p>
                    <small>SWULutions</small>
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
  // post: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  advertisements: state.ads,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAds }
)(HomePage);
