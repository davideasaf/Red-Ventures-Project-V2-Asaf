import React, { Component, PropTypes } from 'react';


import Sidebar from '../Sidebar.jsx';
import WidgetContainer from './WidgetContainer.jsx';
import Headerbar from '../Headerbar.jsx';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Headerbar page="Dashboard"/>
        <Sidebar page="Dashboard"/>
        <WidgetContainer/>
      </div>
    )
  }
}
