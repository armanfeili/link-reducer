import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import linkReducer from './linkReducer';
import mainLinkReducer from './mainLinkReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  link: linkReducer,
  mainLink: mainLinkReducer
});
