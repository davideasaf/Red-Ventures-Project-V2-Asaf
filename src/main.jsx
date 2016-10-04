
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import App from './components/App';
import Dashboard from './components/Dashboard/Dashboard';
import Users from './components/Users/Users';
import Widgets from './components/Widgets/Widgets';

const store = configureStore();


ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="dashboard" />
        <Route path="dashboard" component={Dashboard} />
        <Route path="users" component={Users} />
        <Route path="widgets" component={Widgets} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
