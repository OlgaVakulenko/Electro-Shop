import axios from 'axios';
// import { enqueueSnackbar } from '../notification/actions';

// ACTIONS WITH COMMENTS
export const ADD_COMMENT = 'ADD_COMMENT';
export const GET_COMMENTS = 'GET_COMMETS';

// ACTIONS
export const addComment = (comment, callback, id) => (dispatch) => {
  axios.post('/comments', comment)
    .then(() => {
      callback(id);
    });
};

export const getComments = (id) => (dispatch) => {
  axios
    .get(`/comments/product/${id}`)
    .then((data) => {
      if (data.data) {
        dispatch({
          type: GET_COMMENTS,
          payload: data.data,
        });
      }
    });
};
