import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = ( // logOut is not a <Link> and becasue of it's just a click event, we can use <a>, it's not actually going anywhere // in authLinks we wnat to have logOut button and a link to dashboard,
      <ul className="navbar-links">
        <li className="nav-item">
          <Link className="nav-link" to="/sharedlinks">
            Shared links
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            onClick={this.onLogoutClick.bind(this)}
            to="/login"
          >
            <img
              className="rounded-circle"
              src={`${user.photo}` || `${user.avator}`}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a Gravatar connected to your email to display an image"
            />
            Logout
          </Link>
        </li>
      </ul>
    );

    const guestLinks = ( // in guestLinks we want user to sign-up or log-in
      <ul className="navbar-link">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar sticky" id="navOne">
        <div className="headerContainer" id="navScroll">
          <Link className="navbar-brand" to="/">
            LinkReducer
          </Link>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button> */}

          <div className="right-links" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}{" "}
            {/* Here if isAuthenticated was there, we show authLinks, if not we show guestLinks */}
            <ul className="navbar-link">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Users
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
