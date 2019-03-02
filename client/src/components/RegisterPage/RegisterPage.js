import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class RegisterPage extends Component {
  render() {
    return (
      <div>
        <div className="p-2 mt-5">
          <div className="text-center text-black-50 ">
            <h1 className="font-weight-bold">
              <span className="text-default">Hana</span>Ph
            </h1>
          </div>
          <div className="text-center border border-light p-2">
            <p className="h4 mb-4">Chose what you are</p>

            <Link
              to="/register/applicant"
              className="btn btn-block mt-2 teal darken-2  waves-effect"
            >
              Applicant
            </Link>

            <Link
              to="/register/employer"
              className="btn btn-block mt-2 teal darken-2  waves-effect"
            >
              Employer
            </Link>

            <Link
              to="/"
              className="btn btn-block mt-2 btn-outline-default waves-effect"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
