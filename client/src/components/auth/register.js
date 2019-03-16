import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { registerUser } from '../../actions/authActions';

import InputGroup from '../common/InputGroup';
class Register extends Component {
  constructor () {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onSubmit (e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render () {
    const { errors } = this.state;

    return (
      <div>
        <section>
          <h1>Register</h1>
          <form noValidate onSubmit={this.onSubmit} className='row auth-form'>
            <p className='link-description link-space'>
              Please enter your name.
            </p>
            <InputGroup
              type='text'
              className='auth-input'
              placeholder='James Anderson'
              name='name'
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}></InputGroup>
            <p className='link-description'>
              Please enter your email.
            </p>
            <InputGroup
              type='email'
              className='auth-input'
              placeholder='admin@yahoo.com'
              name='email'
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}></InputGroup>
            <p className='link-description link-space'>
              Please enter a password.
            </p>
            <InputGroup
              type='password'
              className='auth-input'
              placeholder='password here...'
              name='password'
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}></InputGroup>
            <p className='link-description'>
              Please renter your password to confirm.
            </p>
            <InputGroup
              type='password'
              className='auth-input'
              placeholder='confirm password...'
              name='password2'
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}></InputGroup>
            <button className='auth-button' type='submit' value='Submit'>
              Sign up
            </button>
          </form>
        </section>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
