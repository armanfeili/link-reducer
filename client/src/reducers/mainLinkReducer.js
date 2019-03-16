import { CONVERT_LINK, LINK_LOADING } from "../actions/types";
import { setLinkLoading } from "../actions/linkActions";

const initialState = {
  linkConvertedObject: {},
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
    case CONVERT_LINK:
      return {
        ...state,
        linkConvertedObject: action.payload,
        linkLoading: false
      };

    default:
      return state;
  }
}
