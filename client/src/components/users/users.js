import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getProfiles } from '../../actions/authActions';

// import Avatar from 'react-avatar' // we deleted package

class Users extends Component {
  constructor () {
    super();
    this.state = {
      errors: {}
    };

  // this.onChange = this.onChange.bind(this)
  // this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    // // if the user already logedin, we want to redirect the page to dashboard
    // console.log(this.props.auth.isAuthenticated)

    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard')
    // }
    this.props.getProfiles();
  }

  componentWillReceiveProps (nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard')
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

  //   onSubmit (e) {
  //     e.preventDefault()
  //     const userData = {
  //       email: this.state.email,
  //       password: this.state.password
  //     }
  //     this.props.loginUser(userData)
  //   }

  //   onChange (e) {
  //     this.setState({ [e.target.name]: e.target.value })
  //   }

  render () {
    const { errors } = this.state;

    const users = this.props.auth.profiles;
    const usersLoop = [];

    //   var x = 'some string'
    //   alert(x.charAt(0)); // alerts 's'

    if (users !== null) {
      for (let i = 0; i < users.length; i++) {
        const firstLetter = users[i].name.split(' ');

        let y = []; // array for first letters
        let x; // a container for getting first letters together
        for (let i = 0;i < firstLetter.length;i++) {
          y[i] = firstLetter[i].charAt(0); // get first letter of words
          x = y.join('').toUpperCase(); // put them together
        }

        // firstLetter.forEach((word, i) => {
        //   y[i] = word.charAt(0)
        //   x = y.join('').toUpperCase()
        // })
        let picture;
        let oneUser = this.props.auth.profiles[i];
        if (oneUser.photo) {
          picture = (
            <div className='users-avatar'>
              <div className='users-avatar-name'>
                <img
                  className='rounded-circle'
                  src={`${oneUser.photo}` || `${oneUser.avator}`}
                  alt={oneUser.name}
                  style={{ width: '25px', marginRight: '5px' }}
                  title='You must have a Gravatar connected to your email to display an image' />
              </div>
            </div>
          );
        } else {
          picture = (
            <div className='users-avatar'>
              <div className='users-avatar-name'>
                {x}
              </div>
            </div>
          );
        }

        usersLoop[i] = (
          <li className='users-item' key={users[i]._id}>
            {/* <Avatar className='users-avatar' size='70' name='Foo Bar' /> */}
            {picture}
            <span className='users-name'>{users[i].name}</span>
            <span className='users-links-number'>links : {users[i].links}</span>
          </li>
        );
      }
    }

    const UsersList = usersLoop.map(link => {
      return link;
    });
    // console.log(this.props.auth)

    return (
      <div>
        <section className='users-section'>
          <div className='users-section-inner'>
            <h1 className=''>Users</h1>
            <div className='users-container'>
              <div className='users-box'>
                <ul className='users-list'>
                  {UsersList}
                </ul>
              </div>
            </div>
            <div className='AD-box'>
              <ul className='AD-list'>
                <li className='AD-item'>
                  ad
                </li>
                <li className='AD-item'>
                  ad
                </li>
                <li className='AD-item'>
                  ad
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Users.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { getProfiles})(withRouter(Users));
