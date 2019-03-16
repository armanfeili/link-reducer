import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// import logo from './logo.svg'
import './App.css';
import './style/vendors/css/animate.css';
import './style/vendors/css/grid.css';
// import './style/vendors/css/ionicons.min.css'
import './style/vendors/css/normalize.css';
import './style/resources/css/style.css';
import './style/resources/css/quaries.css';

// **** this part is for setting token to all private route if user loged in *****/
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/authActions';
// *******************************************************************************/

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import Login from './components/auth/login';
import Register from './components/auth/register';
import NotFound from './components/not-found/NotFound';

import Dashboard from './components/dashboard/Dashboard';

// Check for token - if we go to browser>inspect>Application>Local Storage , we can see our token 
if (localStorage.jwtToken) {
  // Set auth token header as Authorization
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expirationTime, so all that unreadable token is now readable
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user data and isAuthenticated to true in reducer state 
  store.dispatch(setCurrentUser(decoded));
  // setCurrentUser is actually an action, which because of we exported it,
  // we can call it to dispatch decoded token to reducer and finally update the state.
  // we used store to dispatch an action to reducers

  // Check for expired token
  const currentTime = Date.now() / 1000; // now it is 'second' base
  if (decoded.exp < currentTime) {
    // we sat exp to 3600s , so it checks current time and if it was grater
    // than (the time user logedin + 3600s), it will logout the user

    // Logout user 
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          {/* Router here is actualy BrowserRouter */}
          <div className='App'>
            {/* Navbar and Footer always display but Landing is sth we want to display in "/" route. so we used <Route /> */}
            <Navbar />
            <div>
              <Route exact path='/' component={Landing} />
              {/* exact keyword helps to show component at exacly this specific route */}
              <div className='container'>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                {/* <Route exact path='/profiles' component={Profiles} /> */}
                {/* <Route exact path='/profile/:handle' component={Profile} /> */}
                <Switch>
                  {/* for every private route we just need to wrap it in <switch>, and it prevent from strange redirect issues */}
                  <PrivateRoute exact path='/dashboard' component={Dashboard} />
                </Switch>
                <Route exact path='/not-found' component={NotFound} />
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
