import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HomePage from "../HomePage/HomePage";
import NavPage from "../NavPage/NavPage";
import FooterPage from "../FooterPage/FooterPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import RegisterApplicant from "../RegisterPage/RegisterApplicant";
import RegisterEmployer from "../RegisterPage/RegisterEmployer";
import AddJobAdvertisementPage from "../AddJobAdvertisementPage/AddJobAdvertisement";

class AppPage extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <Router>
        <React.Fragment>
          {isAuthenticated ? (
            <React.Fragment>
              <NavPage />
              {/* <HomePage /> */}
              <Route exact path="/" component={HomePage} />
              <Route
                exact
                path="/advertisement/add"
                component={AddJobAdvertisementPage}
              />

              <FooterPage />
            </React.Fragment>
          ) : (
            // <LoginPage />
            <React.Fragment>
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route
                exact
                path="/register/applicant"
                component={RegisterApplicant}
              />
              <Route
                exact
                path="/register/employer"
                component={RegisterEmployer}
              />
            </React.Fragment>
          )}

          {/* <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/accountsettings" component={AccountSettings} /> */}
        </React.Fragment>
      </Router>
    );
  }
}

AppPage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AppPage);
