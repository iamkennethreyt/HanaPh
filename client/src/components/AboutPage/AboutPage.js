import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Axios from "axios";

import { confirmAlert } from "react-confirm-alert"; // Import

class AboutPAge extends Component {
  state = {
    message: ""
  };
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
            About <span className="text-default">Hana</span>Ph
          </h2>
          {this.props.auth.user.name}
          <p className="text-justify">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
          <form
            className="text-center border border-light p-2"
            onSubmit={e => {
              e.preventDefault();
              Axios.post("/api/advertisements/sendemailtoadmin", {
                message: this.state.message,
                email: this.props.auth.user.email
              }).then(res => {
                confirmAlert({
                  message:
                    "You had successfully send message to the HanaPH developers",
                  buttons: [
                    {
                      label: "Ok"
                    }
                  ]
                });
                console.log(res.data);
              });
            }}
          >
            <p className="h4 mb-4">Send us a message</p>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Your Email"
              name="email"
              defaultValue={this.props.auth.user.email}
              disabled
            />

            <textarea
              rows="3"
              placeholder="your message"
              className="form-control mt-2"
              name="message"
              onChange={e => this.setState({ message: e.target.value })}
            />

            <button className="btn teal darken-2 btn-block mt-2" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(AboutPAge));
