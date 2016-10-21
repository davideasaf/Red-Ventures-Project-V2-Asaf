import { combineReducers } from 'redux';
import widget from './widgetReducer';
import dashboard from './dashboardReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  widget,
  dashboard,
  user,
});

export default rootReducer;
