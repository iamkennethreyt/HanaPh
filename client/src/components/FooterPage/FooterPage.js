import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { confirmAlert } from "react-confirm-alert"; // Import

class FooterPage extends Component {
  onLogout = () => {
    confirmAlert({
      message: "Are you sure to logout the account?",
      buttons: [
        {
          label: "Ok",
          onClick: () => {
            this.props.logoutUser(this.props.history);
          }
        },
        {
          label: "Cancel"
        }
      ]
    });
  };

  render() {
    // const { isAuthenticated, user } = this.props.auth;
    return (
      <React.Fragment>
        <div style={{ height: "50px" }} />
        <footer className="page-footer font-small purple darken-3 fixed-bottom text-center">
          <div className="row">
            <div className="col-md-12">
              <div className="py-3 flex-center">
                <Link to="/home" className="tw-ic">
                  <i className="fa fa-home fa-lg text-white-50 mr-md-5 mx-4 fa-2x" />
                  <br />
                  Home
                </Link>
                <Link to="/" className="fb-ic">
                  <i className="fa fa-bullhorn fa-lg text-white-50 mr-md-5 mx-4 fa-2x" />
                  <br />
                  Ads
                </Link>

                <Link to="/settings" className="li-ic">
                  <i className="fa fa-cog fa-lg text-white-50 mr-md-5 mx-4 fa-2x" />
                  <br />
                  Settings
                </Link>
                <Link to="/about" className="gplus-ic">
                  <i className="fa fa-info fa-lg text-white-50 mr-md-5 mx-4 fa-2x" />
                  <br />
                  About
                </Link>
                <p
                  className="li-ic"
                  onClick={this.onLogout}
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa fa-sign-out fa-lg text-white-50 mr-md-5 mx-4 fa-2x" />
                  <br />
                  Logout
                </p>
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

FooterPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(FooterPage);
