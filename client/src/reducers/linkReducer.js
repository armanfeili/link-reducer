import {
  ADD_LINK,
  GET_LINKS,
  GET_LINK,
  DELETE_LINK,
  LINK_LOADING
} from "../actions/types";

const initialState = {
  links: [],
  link: {},
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

    default:
      return state;
  }
}
