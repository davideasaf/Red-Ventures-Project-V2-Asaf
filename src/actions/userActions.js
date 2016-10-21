import axios from 'axios';

export function fetchSpecificUser(userId) {
  console.log('fetching specific user...');
  return function (dispatch) {
    console.log('fetching specific user...');
    const getUserUrl = `http://spa.tglrw.com:4000/users/${userId}`;

    axios.get(getUserUrl)
      .then((res) => {
        const userData = res.data;
        dispatch({ type: 'FETCH_SPECIFIC_USER_FULFILLED', payload: userData });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_SPECIFIC_USER_FULFILLED', payload: err });
      });
  };
}
