import axios from 'axios';

// ACTIONS WITH CATEGORIES
export const GET_CATEGORIES_REQUESTED = 'GET_CATEGORIES_REQUESTED';
export const GET_CATEGORIES_SUCCEEDED = 'GET_CATEGORIES_SUCCEEDED';
export const GET_CATEGORIES_FAILED = 'GET_CATEGORIES_FAILED';

export const getCategories = () => (dispatch) => {
  dispatch({
    type: GET_CATEGORIES_REQUESTED,
  });
  axios.get('/catalog')
    .then((categories) => {
      console.log('categories', categories);
      const categoriesOptions = categories.data.map((category) => ({
        id: category.id,
        name: category.name,
        imgUrl: category.imgUrl,
      }));
      dispatch({
        type: GET_CATEGORIES_SUCCEEDED,
        categories: categoriesOptions,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CATEGORIES_FAILED,
        payload: err.response.data.message,
      });
    });
};