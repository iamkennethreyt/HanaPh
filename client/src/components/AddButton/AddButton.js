import React, { Component } from "react";
import { Link } from "react-router-dom";
class ButtonPage extends Component {
  state = {};
  render() {
    return (
      <Link
        to="/advertisement/add"
        className="float teal darken-2 btn-lg"
        style={{
          position: "fixed",
          width: "60px",
          height: "60px",
          bottom: "80px",
          right: "10px",
          color: "#FFF",
          borderRadius: "50px",
          textAlign: "center",
          boxShadow: "2px 2px 3px #999,"
        }}
      >
        <i className="fa fa-pencil fa-lg" style={{ marginTop: "11px" }} />
      </Link>
    );
  }
}

export default ButtonPage;
