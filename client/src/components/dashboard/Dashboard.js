import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";

import {
  convertLink,
  addLink,
  getLinks,
  deleteLink,
  shareLink
} from "../../actions/linkActions";
import { getCurrentProfile } from "../../actions/authActions";

import { FaExchangeAlt } from "react-icons/fa";

import { CopyToClipboard } from "react-copy-to-clipboard";

// import {linkComming} from '../../actions/linkActions'
import InputGroup from "../common/InputGroup";

import { MdClose } from "react-icons/md";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      pastelink: "",
      linkComming: "",
      copied: false,
      links: [],
      errors: {}
    };
    // console.log(this.state.linkComming);

    this.myRef = React.createRef();

    // console.log(this.pastelink);

    this.onChange = this.onChange.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.copyText = this.copyText.bind(this);
    this.onAddLink = this.onAddLink.bind(this);
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

  onAddLink(e) {
    const link = {
      linkComming: this.props.mainLink.linkConvertedObject.convertedUrl
    };
    this.props.addLink(link);
  }
  componentDidMount() {
    // if (this.props.auth) {
    //   if (!this.props.auth.isAuthenticated) {
    //     this.props.history.push("/login");
    //   }
    // } else if (!this.props.auth) {
    //   this.props.history.push("/login");
    // }
    // this.props.convertLink(this.state.pastelink);
    this.setState({
      linkComming: this.props.mainLink.linkConvertedObject.convertedUrl
    });
    this.props.getLinks();
    // setTimeout(() => {
    // }, 3000);
    this.props.getCurrentProfile(); // we want to get current profile any time we render this route
  }

  componentDidUpdate() {}
  //   componentDidUpdate(prevProps) {
  //     // if (prevProps.linkComming !== this.props.linkComming) {
  //     //   this.setState({
  //     //     linkComming: this.props.mainLink.linkConvertedObject.convertedUrl
  //     //   });
  //     // } // always make sure that errors in component state in similar to errors in application state
  //     if (prevProps.linkComming === "") {
  //       this.setState({
  //         linkComming: this.props.mainLink.linkConvertedObject.convertedUrl
  //       });
  //     } // always make sure that errors in component state in similar to errors in application state
  //   } // this always rerun component,till the 'then()' part of the action happens

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onShareLink(id) {
    this.props.shareLink(id);
  }

  onDeleteLink(id) {
    this.props.deleteLink(id);
  }

  render() {
    const { errors } = this.state;

    const links = this.props.link.links;
    const linksLoop = [];

    for (let i = 0; i < links.length; i++) {
      linksLoop[i] = (
        <li className="link-item" key={links[i]._id}>
          <p className="link-text">{links[i].textlink}</p>

          <button
            className={classnames("share-link", {
              "shared vis": links[i].shared === true
            })}
            onClick={this.onShareLink.bind(this, links[i]._id)}
          >
            share
          </button>
          <button
            className="delete-link"
            onClick={this.onDeleteLink.bind(this, links[i]._id)}
          >
            <MdClose />
          </button>
        </li>
      );
    }

    const linksList = linksLoop.map(link => {
      return link;
    });

    return (
      <div>
        <section className="get-link-part">
          <h1>Dashboard</h1>
          <form className="links-form" noValidate onSubmit={this.onSubmit}>
            <div className="input-field-dash">
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
            </div>
            <button onSubmit={this.onSubmit} className="convert-button">
              <FaExchangeAlt />
            </button>
            <div className="input-field-dash">
              <p className="link-description link-space">
                get the short link here.
              </p>
              <InputGroup
                type="text"
                className="myInput link-input"
                ref={this.myRef}
                placeholder="like: https://www.google.com/"
                name="linkComming"
                value={
                  this.props.mainLink.linkConvertedObject.convertedUrl || ""
                }
                onChange={this.onChange}
                disabled={true}
                errors={errors}
                id="Progress1"
              />
            </div>
            {/* {console.log(errors.pastelink)} */}

            <CopyToClipboard
              text={this.props.mainLink.linkConvertedObject.convertedUrl}
              onCopy={() => this.setState({ copied: true })}
            >
              <button className="copy-button" onClick={this.copyText}>
                copy
              </button>
            </CopyToClipboard>
            <button className="save-button" onClick={this.onAddLink}>
              Save
            </button>
          </form>
        </section>
        <section className="link-section">
          <div className="link-section-inner">
            <h3 className="direct-text">*Links*</h3>
            <div>
              <div className="link-part">
                <div className="link-box">
                  <h3 className="links-header">here are your links</h3>
                  <div className="links-list-box">
                    <ul className="links-list">{linksList}</ul>
                  </div>
                </div>
              </div>
              <div className="AD-box">
                <ul className="AD-list">
                  <li className="AD-item">ad</li>
                  <li className="AD-item">ad</li>
                  <li className="AD-item">ad</li>
                </ul>
              </div>
            </div>
            <div>
              <Link to="/edit-profile" className="setting-button-link">
                <button className="setting-button">Setting</button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Dashboard.propTypes = {
  convertLink: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
  errors: PropTypes.object,
  mainLink: PropTypes.object.isRequired,
  link: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  mainLink: state.mainLink,
  errors: state.errors,
  link: state.link
});

export default connect(
  mapStateToProps,
  { convertLink, addLink, getLinks, deleteLink, shareLink, getCurrentProfile }
)(Dashboard);
