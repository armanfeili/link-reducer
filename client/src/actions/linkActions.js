import axios from 'axios';

import { LINK_LOADING, GET_LINK, GET_LINKS, ADD_LINK, DELETE_LINK, GET_ERRORS, CLEAR_ERRORS, CONVERT_LINK, GET_CONVERT_LINK, REDIRECT_LINK, GET_SHARED_LINKS } from './types';

export const convertLink = (linkImported) => dispatch => {
  // console.log('***' + link.linkImported)

  axios.post('/api/links/converter', linkImported)
    .then(res => dispatch({
      type: CONVERT_LINK,
      payload: res.data
    })).then(res => dispatch({
    type: CLEAR_ERRORS
  }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const getConvertLink = (link) => dispatch => {
  console.log('***' + link.linkImported);
  axios.get('/api/links/converter', link)
    .then(res => dispatch({
      type: GET_CONVERT_LINK,
      payload: res.data
    })).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
};

export const redirectLink = (linkcode) => dispatch => {
  axios.get(`/api/links/redirect/${linkcode}`)
    .then(res => dispatch({
      type: REDIRECT_LINK,
      payload: res.data
    })).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
};

export const addLink = (linkComming) => dispatch => {
  axios.post('/api/links/savelink', linkComming)
    .then(res => {
      // console.log('works')
      dispatch({
        type: ADD_LINK,
        payload: res.data
      });})
    .catch(err => {
      // console.log("don't")
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });});
};

export const getLink = (id) => dispatch => {
  // dispatch(setLinkLoading())
  axios.get(`/api/links/getlink/${id}`)
    .then(res => dispatch({
      type: GET_LINK,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: null
    }));
};

export const getLinks = () => dispatch => {
  dispatch(setLinkLoading());
  axios.get('/api/links/getlinks')
    .then(res => dispatch({
      type: GET_LINKS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: null
    }));
};

export const deleteLink = (id) => dispatch => {
  axios.delete(`/api/links/deletelink/${id}`)
    .then(res => {
      console.log('works');
      console.log(id);

      dispatch({
        type: DELETE_LINK,
        payload: id // in our reducer, we want to delete a post, locally
      });})
    .catch(err => {

      console.log('dosent');
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });});
};

export const shareLink = (id) => dispatch => {
  axios.post(`/api/links/share/${id}`)
    .then(res => dispatch(getLinks()))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const unshareLink = (id) => dispatch => {
  axios.post(`/api/links/unshare/${id}`)
    .then(res => dispatch(getLinks()))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const getSharedLinks = () => dispatch => {
  axios.get('/api/links/sharedlinks')
    .then(res => {
      dispatch({
        type: GET_SHARED_LINKS,
        payload: res.data
      });})
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: null
      });});
};

export const addLikeToLink = (id) => dispatch => {
  axios.post(`/api/links/like/${id}`)
    .then(res => {
      dispatch(getLink(id));
    })
    .then(res => {
      dispatch(getSharedLinks());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });});
};

export const deleteLikeFromLink = (id) => dispatch => {
  axios.delete(`/api/links/unlike/${id}`)
    .then(res => {
      dispatch(getLink(id));
    })
    .then(res => {
      dispatch(getSharedLinks());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });});
};

export const addComment = (linkId, commentData) => dispatch => {
  // console.log(linkId)
  // console.log(commentData)
  dispatch(clearErrors());
  axios.post(`/api/links/comments/${linkId}`, commentData)
    .then(res => dispatch(getLink(linkId)))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// export const getComment = ()=>dispatch=>{}
// export const getComments = ()=>dispatch=>{}
export const deleteComment = (id, comment_id) => dispatch => {
  console.log(id, comment_id);

  axios.delete(`/api/links/comments/${id}/${comment_id}`)
    .then(res => dispatch(getLink(id)))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const addLikeToComment = (id, comment_id) => dispatch => {
  axios.post(`/api/links/comments/like/${id}/${comment_id}`)
    .then(res => dispatch(getLink(id)))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const deleteLikeFromComment = (id, comment_id) => dispatch => {
  axios.delete(`/api/links/comments/unlike/${id}/${comment_id}`)
    .then(res => dispatch(getLink(id)))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const setLinkLoading = () => {
  return {
    type: LINK_LOADING
  };
};

// export const setCommentLoading = () => {
//   return {
//     type: COMMENT_LOADING
//   }
// }

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
