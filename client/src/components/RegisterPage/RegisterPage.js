import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class RegisterPage extends Component {
  render() {
    return (
      <div>
        <div class="p-2 mt-5">
          <div class="text-center text-black-50 ">
            <h1 class="font-weight-bold">
              <span class="purple-text">Hana</span>Ph
            </h1>
          </div>
          <div class="text-center border border-light p-2">
            <p class="h4 mb-4">Chose what you are</p>

            <Link
              to="/register/applicant"
              class="btn btn-block mt-2 purple darken-3  waves-effect"
            >
              Applicant
            </Link>

            <Link
              to="/register/employer"
              class="btn btn-block mt-2 purple darken-3  waves-effect"
            >
              Employer
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
