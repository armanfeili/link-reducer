import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { convertLink } from "../../actions/linkActions";

import { FaExchangeAlt } from "react-icons/fa";

import { CopyToClipboard } from "react-copy-to-clipboard";

// import {linkComming} from '../../actions/linkActions'
import InputGroup from "../common/InputGroup";
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pastelink: "",
      linkComming: "",
      copied: false
    };
    console.log(this.state.linkComming);

    this.myRef = React.createRef();

    // console.log(this.pastelink);

    this.onChange = this.onChange.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.copyText = this.copyText.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onChange2(event) {
    // this.setState({ [event.target.name]: event.target.value });
    this.setState({
      linkComming: this.props.mainLink.linkConvertedObject.convertedUrl
    });
    console.log(this.state.linkComming);
  }

  onSubmit(e) {
    e.preventDefault();
    const link = {
      linkImported: this.state.pastelink
    };
    this.props.convertLink(link);
  }

  copyText(e) {
    const copyText = this.myRef.current; // it refers the component
    const text = this.myRef.current.props.value; // it refers to text of the input component
    // console.log(text);

    // console.log(copyText);
    // console.log(e.target);
    // console.log(this.myRef);
    // e.target.focus();
    // document.execCommand("copy");
    // alert("Copied the text: " + copyText.value);
    // copyText.select();
    // copyText.props.value.select();
    // document.execCommand("copy");
    // copyText.execCommand("copy");
  }

  // componentDidMount() {
  //   // this.props.convertLink(this.state.pastelink);
  //   this.setState({
  //     linkComming: this.props.mainLink.linkConvertedObject.convertedUrl
  //   });
  // }

  componentDidMount() {
    // if the user already logedin, we want to redirect the page to dashboard
    console.log(this.props.auth.isAuthenticated);

    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.linkComming !== this.props.linkComming) {
    //   this.setState({
    //     linkComming: this.props.mainLink.linkConvertedObject.convertedUrl
    //   });
    // } // always make sure that errors in component state in similar to errors in application state
    if (prevProps.linkComming === "") {
      this.setState({
        linkComming: this.props.mainLink.linkConvertedObject.convertedUrl
      });
    } // always make sure that errors in component state in similar to errors in application state
  } // this always rerun component,till the 'then()' part of the action happens

  render() {
    const { errors } = this.props;

    return (
      <div>
        <section className="get-link-part">
          <h1>Link Reducer</h1>
          <form className="links-form" noValidate onSubmit={this.onSubmit}>
            <p className="link-description">paste a link here.</p>
            <InputGroup
              type="text"
              className="link-input"
              placeholder="like: https://www.google.com/"
              name="pastelink"
              value={this.state.pastelink}
              onChange={this.onChange}
              error={errors.linkImported}
            />
            <button onSubmit={this.onSubmit} className="copy-button">
              <FaExchangeAlt />
            </button>
            <p className="link-description link-space">
              get the short link here.
            </p>
            <InputGroup
              type="text"
              className="myInput link-input"
              ref={this.myRef}
              placeholder="like: https://www.google.com/"
              name="linkComming"
              value={this.props.mainLink.linkConvertedObject.convertedUrl || ""}
              onChange={this.onChange}
              disabled={true}
              errors={errors}
              id="Progress1"
            />
            <CopyToClipboard
              text={this.props.mainLink.linkConvertedObject.convertedUrl}
              onCopy={() => this.setState({ copied: true })}
            >
              <button className="copy-button" onClick={this.copyText}>
                copy
              </button>
            </CopyToClipboard>
          </form>
        </section>
        <section className="goTo-register-or-login">
          <div className="direct-buttons">
            <p className="direct-text">Or do more...</p>
            <button className="signup-button">
              <Link to="/register" className="signup-button-link">
                Sign up
              </Link>
            </button>
            <button className="login-button">
              <Link to="/login" className="login-button-link">
                Login
              </Link>
            </button>
          </div>
        </section>
      </div>
    );
  }
}

Landing.propTypes = {
  convertLink: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  mainLink: state.mainLink
});

export default connect(
  mapStateToProps,
  { convertLink }
)(Landing);
