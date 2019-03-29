import React, { Component } from 'react';

import InputGroup from '../common/InputGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { editProfile, deleteAccount } from '../../actions/authActions';

class EditProfile extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      name: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount () {
    // // if the user already logedin, we want to redirect the page to dashboard
    // console.log(this.props.auth.isAuthenticated)

    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard')
    // }
  }

  componentWillReceiveProps (nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push('/login')
    // }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps) {
  //   }

  //   if (prevProps.errors !== this.props.errors) {
  //     this.setState({ errors: this.props.errors })
  //   }
  // }

  onSubmit (e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      name: this.state.name
    };
    this.props.editProfile(userData, this.props.history);
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDeleteAccount () {
    this.props.deleteAccount();
  }
  render () {
    const { errors } = this.state;

    return (
      <div>
        <section>
          <h1>Edit Profile</h1>
          <form onSubmit={this.onSubmit} className='row auth-form'>
            <p className='link-description link-space'>
              Please enter a new name.
            </p>
            <InputGroup
              type='text'
              className='auth-input'
              placeholder='Enter a new name'
              name='name'
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}></InputGroup>
            <p className='link-description link-space'>
              Please enter a new email.
            </p>
            <InputGroup
              type='email'
              className='auth-input'
              placeholder='admin@yahoo.com'
              name='email'
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}></InputGroup>
            <Link to='/change-password' className='change-password-button-link'>
            <button className='change-password-button'>
              Change password
            </button>
            </Link>
            <button className='delete-account-button' onClick={this.onDeleteAccount.bind(this)}>
              Delete account
            </button>
            <button className='auth-button'>
              submit
            </button>
          </form>
        </section>
      </div>
    );
  }
}

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {editProfile,deleteAccount})(withRouter(EditProfile));
