import React, { Component } from 'react';

import InputGroup from '../common/InputGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { changePassword } from '../../actions/authActions';

class ChangePassword extends Component {
  constructor () {
    super();
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
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
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      confirmNewPassword: this.state.confirmNewPassword
    };
    this.props.changePassword(userData, this.props.history);
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render () {
    const { errors } = this.state;
    console.log(errors.oldPassword);
    let oneError = errors.newIsNotMatch || errors.confirmNewPassword;
    return (
      <div>
        <section>
          <h1>Change pass</h1>
          <form onSubmit={this.onSubmit} className='row auth-form'>
            <p className='link-description link-space'>
              Please enter your old password
            </p>
            <InputGroup
              type='text'
              className='auth-input'
              placeholder='Old pass'
              name='oldPassword'
              value={this.state.oldPassword}
              onChange={this.onChange}
              error={errors.oldPassword}></InputGroup>
            <p className='link-description link-space'>
              Please enter a new password
            </p>
            <InputGroup
              type='password'
              className='auth-input'
              placeholder='New pass'
              name='newPassword'
              value={this.state.newPassword}
              onChange={this.onChange}
              error={errors.newPassword}></InputGroup>
            <p className='link-description link-space'>
              Please reenter your new password
            </p>
            <InputGroup
              type='password'
              className='auth-input'
              placeholder='Confirmation'
              name='confirmNewPassword'
              value={this.state.confirmNewPassword}
              onChange={this.onChange}
              error={oneError}></InputGroup>
            <button className='auth-button'>
              submit
            </button>
          </form>
        </section>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {changePassword})(withRouter(ChangePassword));
