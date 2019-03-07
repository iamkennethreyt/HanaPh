import React, { Component } from "react";
import PropTypes from "prop-types";
import { confirmAlert } from "react-confirm-alert"; // Import
import moment from "moment";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUser } from "../../actions/usersActions";
import { getAd, submitApplication } from "../../actions/adsActions";
import { Link } from "react-router-dom";
import Axios from "axios";

class AddJobAdvertisement extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      title: "",
      details: "",
      date: "",
      user: {
        name: "",
        details: "",
        cityProvince: "",
        completeAddress: "",
        email: "",
        contactInfo: ""
      },
      resume: "",
      applicants: [
        {
          user: {
            name: "",
            _id: ""
          },
          date: Date.now()
        }
      ],
      status: false,
      category: ""
    };
  }

  componentDidMount() {
    this.props.getAd(this.props.match.params.id);
    this.props.getUser(this.props.auth.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.users) {
      this.setState({
        resume: nextProps.users.user.resume
      });
    }
  }

  render() {
    let displayapp;

    if (
      this.props.adv.applicants === undefined ||
      this.props.adv.applicants === null
    ) {
      displayapp = <h1>Loading</h1>;
    } else {
      displayapp = this.props.adv.applicants.map((applicant, id) => {
        return (
          <li
            key={id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <p>
              {applicant.user.name}
              <br className="p-0" />
              <small>{moment(applicant.date).format("LLL")}</small>
            </p>
            <Link
              to={`/profile/${applicant.user._id}`}
              className="btn btn-sm teal darken-2"
            >
              View profile
            </Link>
          </li>
        );
      });
    }

    return (
      <div className="m-3 pt-5 grey-text">
        <button
          className="mt-3 btn btn-sm teal darken-2"
          onClick={() => this.props.history.goBack()}
        >
          Back
        </button>

        <h4>
          {this.props.adv.category} <strong>{this.props.adv.title}</strong>
        </h4>
        <div>
          <p>
            Field :<strong>{this.props.adv.field}</strong>
          </p>
          <p>{this.props.adv.details}</p>
          <small>
            Date posted : {moment(this.props.adv.date).format("LL")}
          </small>
        </div>
        <hr />
        <div>
          {this.props.adv.user === undefined || this.props.adv.user === null ? (
            <h1>Loading...</h1>
          ) : (
            <div>
              {this.props.adv.user._id === this.props.auth.user.id ? (
                <ul className="list-group">{displayapp}</ul>
              ) : (
                <div className="mb-5 pb-5">
                  <h6 className="text-center">Employer Details</h6>
                  <h4>{this.props.adv.user.name}</h4>

                  <p>
                    About the Company : <br />
                    {this.props.adv.user.details}
                  </p>
                  <small>
                    {" "}
                    Comapany Email :{" "}
                    <strong>{this.props.adv.user.email}</strong>
                  </small>
                  <br />
                  <small>
                    Contact Info :{" "}
                    <strong>{this.props.adv.user.contactInfo}</strong>
                  </small>
                  <br />
                  <small>
                    Company Address :
                    <strong>{this.props.adv.user.completeAddress}</strong>
                  </small>
                  {this.props.auth.user.type === "applicant" ? (
                    <button
                      className="btn btn-block btn-sm btn-outline-default"
                      onClick={() => {
                        if (this.state.resume === "nothing") {
                          confirmAlert({
                            message:
                              "You haven't upload resume yet please upload resume before apply this advertisement",
                            buttons: [
                              {
                                label: "Ok"
                              }
                            ]
                          });
                        } else {
                          Axios.post("/api/advertisements/sendemail", {
                            applicantName: this.props.auth.user.name,
                            applicantEmail: this.props.auth.user.email,
                            companyname: this.props.adv.user.name,
                            companyemail: this.props.adv.user.email,
                            message: `Good day ${
                              this.props.adv.user.name
                            } you have a new notification to the advertisement you posted in HanaPH, that Mr/Ms ${
                              this.props.auth.user.name
                            } is applying for ${
                              this.props.adv.title
                            } position. you can send directly to his email ${
                              this.props.auth.user.email
                            }`
                          }).then(res => console.log(res.data));

                          this.props.submitApplication(this.props.adv._id);
                          confirmAlert({
                            message:
                              "You had successfully apply this advertisement to the employer",
                            buttons: [
                              {
                                label: "Ok"
                              }
                            ]
                          });
                        }
                      }}
                    >
                      Apply to this Job
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

AddJobAdvertisement.protoTypes = {
  getAd: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  adv: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  submitApplication: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  adv: state.ads.adv,
  users: state.users
});

export default connect(
  mapStateToProps,
  { getAd, submitApplication, getUser }
)(withRouter(AddJobAdvertisement));
