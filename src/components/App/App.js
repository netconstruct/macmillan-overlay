import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchDonations } from 'actions';
import { NotificationManager } from 'components';

import './App.css';

class App extends Component {
  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }
  render() {
    return (
      <div className="overlay-container">
        <NotificationManager />
      </div>
    );
  }
}

App.propTypes = {
  onMount: PropTypes.func.isRequired,
};

const mapDispatch = (dispatch) => ({
  onMount: () => dispatch(fetchDonations()),
});

export default connect(null, mapDispatch)(App);
