import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addSerialCode,
  getSerialCodes,
  deleteSerialCode
} from "../../actions/serialCodeActions";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { confirmAlert } from "react-confirm-alert"; // Import

class SerialCodesPage extends Component {
  constructor() {
    super();
    this.state = {
      serialcode: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getSerialCodes();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      serialcode: this.state.serialcode
    };

    this.props.addSerialCode(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container mt-5 pt-5">
        <p className="lead text-center">Add Serial Code</p>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className={classnames("form-control mt-2", {
              "is-invalid": errors.serialcode
            })}
            name="serialcode"
            placeholder="Serial Code"
            value={this.state.serialcode}
            onChange={this.onChange}
          />
          {errors.serialcode && (
            <div className="invalid-feedback">{errors.serialcode}</div>
          )}
          <button className="btn teal darken-2 btn-block mt-2" type="submit">
            Submit
          </button>
        </form>
        <ul className="list-group mt-4">
          {this.props.serialcodes.serialcodes.map((sc, i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {sc.serialcode}
              <button
                className="btn btn-sm btn-outline-default"
                onClick={() => {
                  confirmAlert({
                    message: "Are you sure to delete this serial code",
                    buttons: [
                      {
                        label: "Ok",
                        onClick: () => {
                          this.props.deleteSerialCode(sc._id);
                        }
                      },
                      {
                        label: "Cancel"
                      }
                    ]
                  });
                }}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

SerialCodesPage.propTypes = {
  addSerialCode: PropTypes.func.isRequired,
  getSerialCodes: PropTypes.func.isRequired,
  deleteSerialCode: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  serialcodes: state.serialcodes
});

export default connect(
  mapStateToProps,
  { addSerialCode, getSerialCodes, deleteSerialCode }
)(withRouter(SerialCodesPage));
