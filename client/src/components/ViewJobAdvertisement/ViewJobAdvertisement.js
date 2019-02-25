import React, { Component } from "react";
import PropTypes from "prop-types";
import { confirmAlert } from "react-confirm-alert"; // Import
import moment from "moment";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUser } from "../../actions/usersActions";
import { getAd, submitApplication } from "../../actions/adsActions";
import { Link } from "react-router-dom";

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
            name: ""
          }
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
    if (nextProps.adv) {
      console.log("======", nextProps.adv);
      const {
        details,
        status,
        title,
        _id,
        category,
        user,
        applicants,
        date
      } = nextProps.adv;
      this.setState({
        _id,
        details,
        status,
        title,
        category,
        user,
        applicants,
        date
      });
    }

    if (nextProps.users) {
      this.setState({
        resume: nextProps.users.user.resume
      });
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="m-3 pt-5 grey-text">
        <u
          className="mt-2"
          style={{ cursor: "pointer" }}
          onClick={() => this.props.history.goBack()}
        >
          Back
        </u>

        <h4>
          Ads Title :<strong>{this.state.title}</strong>
        </h4>
        <div>
          <p>
            Category :<strong>{this.state.category}</strong>
          </p>
          <p>{this.state.details}</p>
          <small>Date posted : {moment(this.state.date).format("LL")}</small>
        </div>
        <hr />
        {this.props.auth.user.type === "applicant" ? (
          <div className="mb-5 pb-5">
            <h6 className="text-center">Emplyer Details</h6>
            <h4>{user.name}</h4>

            <p>
              About the Company : <br />
              {user.details}
            </p>
            <small>
              {" "}
              Comapany Email : <strong>{user.email}</strong>
            </small>
            <br />
            <small>
              Contact Info : <strong>{user.contactInfo}</strong>
            </small>
            <br />
            <small>
              Company Address :<strong>{user.completeAddress}</strong>
            </small>
            <button
              className="btn btn-block btn-sm btn-outline-secondary"
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
                  this.props.submitApplication(this.state._id);
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
              Apply THIS Advertisement
            </button>
          </div>
        ) : (
          <ul className="list-group">
            {this.state.applicants.map((applicant, id) => {
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
                    className="badge badge-secondary badge-pill"
                  >
                    View profile
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
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
