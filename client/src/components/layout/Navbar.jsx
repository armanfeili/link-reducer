import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/authActions";

import { FaBars } from "react-icons/fa";

import $ from "jquery";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };

    // this.stickyNavbar = this.stickyNavbar.bind(this);
    this.scroolSoft = this.scroolSoft.bind(this);
    this.mobileNav = this.mobileNav.bind(this);
  }

  onLogoutClick(event) {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  scroolSoft() {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      let currentScrollPos = window.pageYOffset;
      if ($("#navOne").hasClass("sticky")) {
        // console.log("has");

        if (prevScrollpos > currentScrollPos) {
          document.querySelector(".sticky").style.top = "0";
        } else {
          document.querySelector(".sticky").style.top = "-50px";
        }
        prevScrollpos = currentScrollPos;
        // console.log('sticky runs')
      }
      if (!$("#navOne").hasClass("sticky")) {
        document.getElementById("navOne").style.top = "-50px";
        // console.log('nav runs')
      }
    };
  }

  // openNavbar() {
  //   var x = document.querySelector("navbar-links");
  //   if (x.style.display === "block") {
  //     x.style.display = "none";
  //   } else {
  //     x.style.display = "block";
  //   }
  // }

  myFunction() {
    var x = document.getElementById("mobile-nav1");
    var y = document.getElementById("navOne");
    if (x.style.display === "block") {
      x.style.display = "none";
      y.style.height = "60px";
    } else {
      x.style.display = "block";
      y.style.height = "215px";
    }
  }

  mobileNav(e) {
    let list = document.getElementById("list");
    // let nav = $(".js--main-nav");
    // nav.slideToggle(200);

    if (this.state.open === false) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }

    // /* Mobile navigation */
    // $('.js--nav-icon').click(function () {
    //   var nav = $('.js--main-nav');
    //   var icon = $('.js--nav-icon i');

    //   nav.slideToggle(200);

    //   if (icon.hasClass('ion-navicon-round')) {
    //     icon.addClass('ion-close-round');
    //     icon.removeClass('ion-navicon-round');
    //   } else {
    //     icon.addClass('ion-navicon-round');
    //     icon.removeClass('ion-close-round');
    //   }
    // });
  }

  componentDidMount() {
    this.scroolSoft();
    // window.onscroll = () => {
    //   this.stickyNavbar();
    // };
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = ( // logOut is not a <Link> and becasue of it's just a click event, we can use <button>, it's not actually going anywhere // in authLinks we wnat to have logOut button and a link to dashboard,
      <ul className="navbar-links" id="mobile-nav2">
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

          {/* <button
              className="mobile-nav-icon js--nav-icon"
              onClick={this.openNavbar.bind(this)}
            >
              <FaBars />
            </button> */}
          <button
            className="mobile-nav-icon"
            onClick={this.myFunction.bind(this)}
            id="list"
          >
            <FaBars className="nav-icon" />
          </button>
          <div className="right-links" id="mobile-nav1">
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
