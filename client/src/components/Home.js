import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Advertisement from "./Advertisement";
import Login from "./Login";

class Home extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <React.Fragment>
        {isAuthenticated ? <Advertisement /> : <Login />}

        {/* {isAuthenticated ? (
          <Link to="/accountsettings" className="btn purple text-white my-4">
            Change Password
          </Link>
        ) : null} */}
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
