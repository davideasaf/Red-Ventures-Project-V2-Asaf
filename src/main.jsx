
import { Router, Route, browserHistory, IndexRedirect, DefaultRoute} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import App from './components/App.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Users from './components/Users/Users.jsx';
import Widgets from './components/Widgets/Widgets.jsx';

const store = configureStore();


ReactDOM.render((
	<Provider store={store}>
		<Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="dashboard"/>
        <Route path="dashboard" component={Dashboard}/>
        <Route path="users" component={Users}/>
        <Route path="widgets" component={Widgets}/>
      </Route>
		</Router>
	</Provider>
), document.getElementById('app'));
