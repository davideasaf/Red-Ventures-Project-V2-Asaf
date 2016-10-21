import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import Sidebar from '../Sidebar';
import Headerbar from '../Headerbar';
import DisplayTable from '../DisplayTable';

import { fetchUsers } from '../../actions/dashboardActions';
import { fetchSpecificUser } from '../../actions/userActions';


@connect((store) => {
  return {
    usersData: store.dashboard.usersData,
  };
})
export default class Users extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchUsers());
  }

  handleUserClickTable(userData) {
    // userData has all data to display but I will display hitting the API endpoint:
    // If this were specifically set to hit the API, I would only pass the ID up from the table child component
    this.props.dispatch(fetchSpecificUser(userData.id));
    $('#myModal').modal('show');
  }


  render() {
    // possible to set headers dynamically by getting data object's keys
    const tableHeaders = ['ID', 'Name', 'Avatar'];
    return (
      <div className="users">
        <UserModal />
        <Headerbar page="Users" />
        <Sidebar page="Users" />
        <DisplayTable
          title="Users"
          tableHeaders={tableHeaders}
          displayData={this.props.usersData}
          avatar="true"
          onRowDataClick={this.handleUserClickTable.bind(this)}
        />
      </div>
    );
  }
}

@connect((store) => {
  return {
    displayData : store.user.currentUserView
  };
})
class UserModal extends Component {

  render() {
    return (
      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">{this.props.displayData.name}</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <h1 className="text-center"><img className="gravatar-large" src={this.props.displayData.gravatar} /></h1>
                <h3>Name: {this.props.displayData.name}</h3>
                <h3>Id: {this.props.displayData.id}</h3>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

UserModal.propTypes = {
  displayData: React.PropTypes.object.isRequired,
};
