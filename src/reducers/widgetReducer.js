export default (state = {}, action) => {
  switch (action.type) {
    case 'OPEN_MODAL' : return 'MODAL OPENING';
    case 'CLOSE_MODAL': return 'MODAL CLOSING';
  }
  return state;
};
