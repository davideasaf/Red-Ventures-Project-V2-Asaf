import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import DashboardBox from './DashboardBox';
import DisplayTable from '../DisplayTable';
import { fetchUsers, fetchWidgets } from '../../actions/dashboardActions';

@connect((store) => {
  return {
    usersData: store.dashboard.usersData,
    widgetsData: store.dashboard.widgetsData
  };
})
class WidgetContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchWidgets());
  }


  render() {
    const tableHeaders = ['ID', 'Name'];
    return (
      <div className="dashboard">
        <div className="page-content">
          <div className="row">
            <DashboardBox title="Users" dataLength={this.props.usersData.length} icon="fa fa-users" />
            <DashboardBox title="Widgets" dataLength={this.props.widgetsData.length} icon="fa fa-cubes" />
          </div>
          <div className="row">
            <DisplayTable title="Users" displayData={this.props.usersData} tableHeaders={tableHeaders} />
            <DisplayTable title="Widgets" displayData={this.props.widgetsData} tableHeaders={tableHeaders} />
          </div>
        </div>
      </div>
    );
  }
}

WidgetContainer.propTypes = {

};

export default WidgetContainer;

