import React, { Component } from "react";
import { Link } from "react-router-dom";
class ButtonPage extends Component {
  state = {};
  render() {
    return (
      // <a class="btn-floating float-right m-5 btn-large waves-effect waves-light red">
      //   <i class="material-icons">add</i>
      // </a>
      <div
        className="fixed-action-btn position-fixed"
        style={{
          right: "20px",
          bottom: "70px"
        }}
      >
        <Link
          to="/advertisement/add"
          className="btn-lg waves-effect btn-floating purple darken-3 rounded-circle text-white"
        >
          <i className="fa fa-plus fa-lg" />
        </Link>
      </div>
    );
  }
}

export default ButtonPage;
