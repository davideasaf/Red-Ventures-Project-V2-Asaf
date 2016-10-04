import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as Actions from '../actions';


import DashboardBox from './DashboardBox.jsx';
import DisplayTable from '../DisplayTable.jsx';



class WidgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {usersData: [], widgetsData: []};

  };
  getUsersFromApi() {
    let getUsersUrl = '/api/users';
    let queryOptions = {
      type: 'GET',
      url: getUsersUrl,
      success: function(userData) {
        console.debug('userData', userData);
        this.setState({usersData: userData});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    };

    $.ajax(queryOptions);

  };

  getWidgetsFromApi() {
    let getWidgetsUrl = '/api/widgets';
    let queryOptions = {
      type: 'GET',
      url: getWidgetsUrl,
      success: function(widgetData) {
        console.debug('widgetData', widgetData);
        this.setState({widgetsData: widgetData});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    };

    $.ajax(queryOptions);

  };


  componentDidMount() {
    this.getUsersFromApi();
    this.getWidgetsFromApi();
  };

  render() {
    let tableHeaders = ['ID', 'Name'];
    return (
      <div className="dashboard">
        <div className="page-content">
          <div className="row">
            <DashboardBox title="Users" dataLength={this.state.usersData.length} icon="fa fa-users"/>
            <DashboardBox title="Widgets" dataLength={this.state.widgetsData.length} icon="fa fa-cubes"/>
          </div>
          <div className="row">
            <DisplayTable title="Users" displayData={this.state.usersData} tableHeaders={tableHeaders}/>
            <DisplayTable title="Widgets" displayData={this.state.widgetsData} tableHeaders={tableHeaders}/>
          </div>
        </div>
      </div>
    );
  }
}

WidgetContainer.propTypes = {

};

// export default connect(mapStateToProps, mapDispatchToProps)(WidgetContainer);
export default WidgetContainer;





