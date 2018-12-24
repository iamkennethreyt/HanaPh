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
    const { isAuthenticated, user } = this.props.auth;
    return (
      <footer class="page-footer font-small purple darken-3 fixed-bottom text-center">
        <div class="row">
          <div class="col-md-12">
            <div class="py-3 flex-center">
              <a class="fb-ic">
                <i class="fa fa-bullhorn fa-lg text-white-50 mr-md-5 mx-4 fa-2x" />
              </a>

              <a class="gplus-ic">
                <i class="fa fa-search fa-lg text-white-50 mr-md-5 mx-4 fa-2x" />
              </a>
              <a class="li-ic">
                <i class="fa fa-cog fa-lg text-white-50 mr-md-5 mx-4 fa-2x" />
              </a>
              <a class="tw-ic">
                <i class="fa fa-info fa-lg text-white-50 mr-md-5 mx-4 fa-2x" />
              </a>
              <a class="li-ic" onClick={this.onLogout}>
                <i class="fa fa-sign-out fa-lg text-white-50 mr-md-5 mx-4 fa-2x" />
              </a>
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
