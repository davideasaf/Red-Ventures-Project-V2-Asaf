import { combineReducers } from 'redux';
import WidgetReducer from './widgetReducer';

const rootReducer = combineReducers({
  widget: WidgetReducer,
});

export default rootReducer;
