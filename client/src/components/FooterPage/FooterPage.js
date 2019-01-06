import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class FooterPage extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    // const { isAuthenticated, user } = this.props.auth;
    return (
      <footer className="page-footer font-small purple darken-3 fixed-bottom text-center">
        <div className="row">
          <div className="col-md-12">
            <div className="py-3 flex-center">
              <Link to="/" className="fb-ic">
                <i className="fa fa-bullhorn fa-lg text-white-50 mr-md-5 mx-4 fa-2x" />
              </Link>

              <Link to="/" className="gplus-ic">
                <i className="fa fa-search fa-lg text-white-50 mr-md-5 mx-4 fa-2x" />
              </Link>
              <Link to="/" className="li-ic">
                <i className="fa fa-cog fa-lg text-white-50 mr-md-5 mx-4 fa-2x" />
              </Link>
              <Link to="/" className="tw-ic">
                <i className="fa fa-info fa-lg text-white-50 mr-md-5 mx-4 fa-2x" />
              </Link>
              <Link to="/" className="li-ic" onClick={this.onLogout}>
                <i className="fa fa-sign-out fa-lg text-white-50 mr-md-5 mx-4 fa-2x" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
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
