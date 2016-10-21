const initialState = {
  currentUserView: {},
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'FETCH_SPECIFIC_USER_FULFILLED': {
      return { ...state, currentUserView: action.payload };
    }
    default: {
      return state;
    }
  }
}