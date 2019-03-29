import {
  ADD_LINK,
  GET_LINKS,
  GET_LINK,
  DELETE_LINK,
  LINK_LOADING,
  GET_SHARED_LINKS
} from "../actions/types";

const initialState = {
  links: [],
  link: {},
  sharedLinks: [],
  linkLoading: false,
  commentLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LINK_LOADING:
      return {
        ...state,
        linkLoading: true
      };

    case GET_LINKS:
      return {
        ...state,
        links: action.payload,
        linkLoading: false
      };
    case GET_LINK:
      return {
        ...state,
        link: action.payload,
        linkLoading: false
      };
    case ADD_LINK:
      return {
        ...state,
        links: [action.payload, ...state.links]
      };
    case DELETE_LINK:
      return {
        ...state,
        links: state.links.filter(link => link._id !== action.payload)
      };
    case GET_SHARED_LINKS:
      return {
        ...state,
        sharedLinks: action.payload,
        linkLoading: false
      };
    default:
      return state;
  }
}
