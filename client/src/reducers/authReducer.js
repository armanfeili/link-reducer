import {
  SET_CURRENT_USER,
  PROFILE_LOADING,
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_CURRENT_PROFILE,
  EDIT_PROFILE,
  DELETE_ACCOUNT,
  CHANGE_PASSWORD
} from "../actions/types";
import isEmpty from "../validation/is_empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  profile: null,
  profiles: null, // an array of profiles
  loading: false // this will be true while we're fetching data
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case EDIT_PROFILE:
      return {
        ...state,
        isAuthenticated: false
      };
    case CHANGE_PASSWORD:
      return {
        ...state
        // isAuthenticated: false
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
