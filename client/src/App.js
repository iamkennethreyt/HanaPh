import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";

// import Login from "./components/Login";
// import Home from "./components/Home";
// import Register from "./components/Register";
// import Navbar from "./components/Navbar";
// import AccountSettings from "./components/AccountSettings";
import AppPage from "./components/AppPage/AppPage";

//check for token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);

  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check fo expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());

    //redirect to
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppPage />
      </Provider>
    );
  }
}

export default App;
