import axios from 'axios';

export function fetchUsers() {
  console.log('fetching users...');
  return function (dispatch) {
    console.log('fetching users...');
    axios.get('http://spa.tglrw.com:4000/users/')
      .then((res) => {
        const usersData = res.data;
        dispatch({ type: 'FETCH_USERS_FULFILLED', payload: usersData });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_USERS_REJECTED', payload: err });
      });
  };
}

export function fetchWidgets() {
  console.log('fetching widgets...');
  return function (dispatch) {
    console.log('fetching widgets...');
    axios.get('http://spa.tglrw.com:4000/widgets/')
      .then((res) => {
        const widgetsData = res.data;
        dispatch({ type: 'FETCH_WIDGETS_FULFILLED', payload: widgetsData });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_WIDGETS_FULFILLED', payload: err });
      });
  };
}
