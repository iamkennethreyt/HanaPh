import React, { Component } from "react";
import { Link } from "react-router-dom";
class ButtonPage extends Component {
  state = {};
  render() {
    return (
      // <a class="btn-floating float-right m-5 btn-large waves-effect waves-light red">
      //   <i class="material-icons">add</i>
      // </a>
      // <div
      //   className="fixed-action-btn position-fixed"
      //   style={{
      //     right: "20px",
      //     bottom: "70px"
      //   }}
      // >
      //   <Link
      //     to="/advertisement/add"
      //     className="btn-lg waves-effect btn-floating purple darken-3 rounded-circle text-white"
      //   >
      //     <i className="fa fa-plus fa-lg" />
      //   </Link>
      // </div>
      <Link
        to="/advertisement/add"
        className="float purple darken-3 btn-lg"
        style={{
          position: "fixed",
          width: "60px",
          height: "60px",
          bottom: "60px",
          right: "10px",
          color: "#FFF",
          borderRadius: "50px",
          textAlign: "center",
          boxShadow: "2px 2px 3px #999,"
        }}
      >
        <i class="fa fa-pencil fa-lg" style={{ marginTop: "10px" }} />
      </Link>
    );
  }
}

export default ButtonPage;
