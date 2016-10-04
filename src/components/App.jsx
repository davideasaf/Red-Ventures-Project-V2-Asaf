import React, { Component, PropTypes } from 'react';


export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div id="page-wrapper" className="open">
        {this.props.children}
      </div>
    </div>
    );
  }
}
