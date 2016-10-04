import React, { Component, PropTypes } from 'react';
import 'bootstrap';


import Sidebar from '../Sidebar.jsx';
import Headerbar from '../Headerbar.jsx';
import EditWidgetModal from './EditWidgetModal.jsx';
import DisplayTable from '../DisplayTable.jsx'


export default class Widgets extends Component {
  constructor(props) {
    super(props);
    this.state = {widgetsData: [], currentWidgetData: {}};
  };

  handleWidgetClickTable(widgetData){
    let widgetId = widgetData.id;

    let getWidgetsUrl = '/api/widgets/' + widgetId;
    let queryOptions = {
      type: 'GET',
      url: getWidgetsUrl,
      success: function(widgetData) {
        console.debug('widgetData', widgetData);
        this.setState({currentWidgetData: widgetData});
        $('#myModal').modal('show');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    };

    $.ajax(queryOptions);
  };

  loadWidgetsFromApi() {
    let getWidgetsUrl = '/api/widgets';
    let queryOptions = {
      type: 'GET',
      url: getWidgetsUrl,
      success: function(widgetData) {
        this.setState({widgetsData: widgetData});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    };

    $.ajax(queryOptions);

  };

  handleModalChange(inputChange) {
    this.setState({currentWidgetData: inputChange})
  }

  showCreateModal(e){
    e.preventDefault();
    let clearedOutWidget = {
      name: '',
      price: 0,
      color: 'red',
      melts: false,
      inventory: 0

    };
    this.setState({currentWidgetData: clearedOutWidget});
    $('#myModal').modal('show');

  }

  componentDidMount() {
    this.loadWidgetsFromApi();
  };

  reload(){
    console.log('reloading');
    this.loadWidgetsFromApi();
  }

  render() {
    let tableHeaders = ['Name', 'Color', 'Price', 'Melts?', 'Inventory'];

    return (
      <div className="widgets">
        <EditWidgetModal
          displayData={this.state.currentWidgetData}
          onWidgetInput={this.handleModalChange.bind(this)}
          onWidgetEdited={this.reload.bind(this)}
        />
        <Headerbar page="Widgets"/>
        <Sidebar page="Widgets"/>

        <div className="col-lg-12 col-xs-12">
          <div className="pull-right">
            <button className="btn btn-sm btn-info" onClick={this.showCreateModal.bind(this)}>+ Create</button>
          </div>
        </div>
        <DisplayTable
          title='Widgets'
          tableHeaders={tableHeaders}
          displayData={this.state.widgetsData}
          onRowDataClick={this.handleWidgetClickTable.bind(this)}
        />
      </div>
    )
  }
}

