import React, { Component, PropTypes } from 'react';
import axios from 'axios';

import 'bootstrap';


import Sidebar from '../Sidebar';
import Headerbar from '../Headerbar';
import EditWidgetModal from './EditWidgetModal';
import DisplayTable from '../DisplayTable';


export default class Widgets extends Component {
  constructor(props) {
    super(props);
    this.state = { widgetsData: [], currentWidgetData: {} };
  }

  handleWidgetClickTable(widgetData) {
    const widgetId = widgetData.id;

    const getWidgetsUrl = `http://spa.tglrw.com:4000/widgets/${widgetId}`;

    axios.get(getWidgetsUrl)
      .then((res) => {
        const widgetData = res.data;
        this.setState({ currentWidgetData: widgetData });
        $('#myModal').modal('show');
      })
      .catch((e) => {
        console.error(`GET ${getWidgetsUrl} returned: ${e.toString()} ==> ${e}`);
      });

/*
    const queryOptions = {
      type: 'GET',
      url: getWidgetsUrl,
      success: function (widgetData) {
        this.setState({ currentWidgetData: widgetData });
        $('#myModal').modal('show');
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    };

    $.ajax(queryOptions);*/
  }

  loadWidgetsFromApi() {
    const getWidgetsUrl = 'http://spa.tglrw.com:4000/widgets/';
    axios.get(getWidgetsUrl)
      .then((res) => {
        const widgetData = res.data;
        this.setState({ widgetsData: widgetData });
      })
      .catch((e) => {
        console.error(`GET ${getWidgetsUrl} returned: ${e.toString()} ==> ${e}`);
      });

/*
    const getWidgetsUrl = '/api/widgets';
    const queryOptions = {
      type: 'GET',
      url: getWidgetsUrl,
      success: function (widgetData) {
        this.setState({ widgetsData: widgetData });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    };

    $.ajax(queryOptions);*/
  }

  handleModalChange(inputChange) {
    this.setState({ currentWidgetData: inputChange });
  }

  showCreateModal(e) {
    e.preventDefault();
    const clearedOutWidget = {
      name: '',
      price: 0,
      color: 'red',
      melts: false,
      inventory: 0,

    };
    this.setState({ currentWidgetData: clearedOutWidget });
    $('#myModal').modal('show');
  }

  componentDidMount() {
    this.loadWidgetsFromApi();
  }

  reload() {
    console.log('reloading');
    this.loadWidgetsFromApi();
  }

  render() {
    const tableHeaders = ['Name', 'Color', 'Price', 'Melts?', 'Inventory'];

    return (
      <div className="widgets">
        <EditWidgetModal
          displayData={this.state.currentWidgetData}
          onWidgetInput={this.handleModalChange.bind(this)}
          onWidgetEdited={this.reload.bind(this)}
        />
        <Headerbar page="Widgets" />
        <Sidebar page="Widgets" />

        <div className="col-lg-12 col-xs-12">
          <div className="pull-right">
            <button className="btn btn-sm btn-info" onClick={this.showCreateModal.bind(this)}>+ Create</button>
          </div>
        </div>
        <DisplayTable
          title="Widgets"
          tableHeaders={tableHeaders}
          displayData={this.state.widgetsData}
          onRowDataClick={this.handleWidgetClickTable.bind(this)}
        />
      </div>
    );
  }
}

