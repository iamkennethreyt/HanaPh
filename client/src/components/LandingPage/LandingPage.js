import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class LandingPage extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="p-2 mt-5">
        <div className="text-center text-black-50 mt-5">
          <h2 className="font-weight-bold">
            Welcome to <span className="text-default">Hana</span>Ph
            <br />
            {this.props.auth.user.name}
          </h2>
          <p className="text-justify">{this.props.auth.user.details}</p>
        </div>
      </div>
    );
  }
}

LandingPage.protoTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(LandingPage));
