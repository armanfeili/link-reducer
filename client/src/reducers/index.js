import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import linkReducer from './linkReducer';

export default combineReducers({
  auth: authReducer,
//   errors: errorReducer,
//   link: linkReducer
});
