import React, { Component } from 'react';

import InputGroup from '../common/InputGroup';
class Navbar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConffirm: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (e) {
    e.preventDefault();
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
          <form action='' className='row auth-form'>
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
              errors={errors}></InputGroup>
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
              errors={errors}></InputGroup>
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
              errors={errors}></InputGroup>
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
              errors={errors}></InputGroup>
            <button className='auth-button'>
              login
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default Navbar;
