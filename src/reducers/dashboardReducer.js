const initialState = {
  usersData: [],
  widgetsData: [],
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'FETCH_USERS_FULFILLED': {
      return { ...state, usersData: action.payload };
    }
    case 'FETCH_WIDGETS_FULFILLED': {
      return { ...state, widgetsData: action.payload };
    }
    default: {
      return state;
    }
  }
}