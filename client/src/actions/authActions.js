import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, PROFILE_LOADING, GET_PROFILE, GET_PROFILES } from './types';

// // Register user
// export const registerUser = (userData, history) => dispatch => {
//   console.log(userData)

//   axios.post('/api/users/register', userData) // we send a request to server with data
//     .then(res => history.push('/login')) // if request has been sent, we redirect the page to '/login'
//     .catch(err => dispatch({ // if there was any error for sending request, we dispatch GET_ERRORS to the reducers
//       type: GET_ERRORS,
//       payload: err.response.data
//     }))
// }

// Register user
export const registerUser = (userData, history) => dispatch => {
  //     return { // we're sending this action to all reducers. userdata here is actualy the data coming from axios or http request
  //     type: TEST_DISPATCH,
  //     payload: userdata
  //   }
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login')) // if axios.post worked successfully we ridirect /register route to /login
    .catch(err => dispatch({ // calling dispatch , help us to send an action
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// Login user - Get user token
export const loginUser = (userData) => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      // token includes : payload = { id: user.id, name: user.name, avatar: user.avatar }
      const {token} = res.data; // const token = res.data.token
      // create a variable named 'jwtToken' and pass the token and add it to localStorage
      localStorage.setItem('jwtToken', token);
      // set token to Auth header // // this will go to be used in any private routes
      setAuthToken(token); // when this function get called, a header will add to http request with key of Authorization and value of token
      // Decode token to get userData
      // in order to decode this, we need to add a module jwt-decode , then we can extract user from that
      const decoded = jwt_decode(token); // decoded has userdata and expirationTime of the token
      // Set current user
      dispatch(setCurrentUser(decoded)); // setCurrentUser is a function for dispatching (sending) an action, which defined below.
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false); // it means there is no token
  dispatch(setCurrentUser({}));
  // setCurrentUser() will send an empty object as payload, so user will be like { },
  // and isAuthenticated: !isEmpty(action.payload), so because payload is an empty object, isAuthenticated will be false

};

export const setCurrentUser = decoded => { // this will get the decoded token and return an action 
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// ********************************************************************************//

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/users/current')
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/users/profiles')
    .then(res => dispatch({
      type: GET_PROFILES,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

export const deleteAccount = (history) => dispatch => {
  axios.delete('/api/users/deleteuser')
    .then(res => {
      dispatch({
        type: SET_CURRENT_USER, // it will go to authReducer and set the user as empty object and isAuthenticated will set to false.
        payload: {}
      });
      history.push('/login');
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: {}
    }));
};

// Profile Loading
export const setProfileLoading = () => {
  // We don't need to send any payload or anything, it's just going to let the reducer know that it's loading.
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  // We don't need to send any payload or anything, it's just going to let the reducer know that there is no profile.
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
