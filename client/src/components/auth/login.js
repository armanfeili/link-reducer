import React, { Component } from 'react';
import { loginUser } from '../../actions/authActions';

import InputGroup from '../common/InputGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount () {
    // if the user already logedin, we want to redirect the page to dashboard
    console.log(this.props.auth.isAuthenticated);

    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

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
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render () {
    const { errors } = this.state;

    return (
      <div>
        <section>
          <h1>Login</h1>
          <form action='' onSubmit={this.onSubmit} className='row auth-form'>
            <p className='link-description link-space'>
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
              Please enter your password.
            </p>
            <InputGroup
              type='password'
              className='auth-input'
              placeholder='password here...'
              name='password'
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}></InputGroup>
            <button className='auth-button'>
              login
            </button>
          </form>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(withRouter(Login));
