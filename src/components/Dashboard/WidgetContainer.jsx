import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as Actions from '../actions';


import DashboardBox from './DashboardBox';
import DisplayTable from '../DisplayTable';


class WidgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { usersData: [], widgetsData: [] };
  }
  getUsersFromApi() {

    axios.get('http://spa.tglrw.com:4000/users/')
      .then((res) => {
        const userData = res.data;
        this.setState({ usersData: userData });
      })
      .catch((e) => {
        console.error(`GET ${this.props.url} returned: ${e.toString()} ==> ${e}`);
      });

// .Ajax call for server call. Axios works best for this case.
/*
    const getUsersUrl = '/api/users';
    const queryOptions = {
      type: 'GET',
      url: getUsersUrl,
      success: function (userData) {
        console.debug('userData', userData);
        this.setState({ usersData: userData });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
      ,};
    $.ajax(queryOptions);*/
  }

  getWidgetsFromApi() {
    const getWidgetsUrl = 'http://spa.tglrw.com:4000/widgets';


    axios.get(getWidgetsUrl)
      .then((res) => {
        const widgetData = res.data;
        this.setState({ widgetsData: widgetData });
      })
      .catch((e) => {
        console.error(`GET ${getWidgetsUrl} returned: ${e.toString()} ==> ${e}`);
      });

/*
    const queryOptions = {
      type: 'GET',
      url: getWidgetsUrl,
      success: function (widgetData) {
        this.setState({ widgetsData: widgetData });
      }.bind(this),
      error: function (xhr, status, err) {
      }.bind(this),
    };

    $.ajax(queryOptions);*/
  }


  componentDidMount() {
    this.getUsersFromApi();
    this.getWidgetsFromApi();
  }

  render() {
    const tableHeaders = ['ID', 'Name'];
    return (
      <div className="dashboard">
        <div className="page-content">
          <div className="row">
            <DashboardBox title="Users" dataLength={this.state.usersData.length} icon="fa fa-users" />
            <DashboardBox title="Widgets" dataLength={this.state.widgetsData.length} icon="fa fa-cubes" />
          </div>
          <div className="row">
            <DisplayTable title="Users" displayData={this.state.usersData} tableHeaders={tableHeaders} />
            <DisplayTable title="Widgets" displayData={this.state.widgetsData} tableHeaders={tableHeaders} />
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

