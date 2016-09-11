import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showNotification } from 'actions';
import { Notification } from 'components';
import './NotificationManager.css';

class NotificationManager extends Component {
  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }
  render() {
    const { isProcessing, notification } = this.props;
    return (
      <div className="notification-container">
        {notification ?
          <Notification
            isProcessing={isProcessing}
            notification={notification}
          /> : null}
      </div>
    );
  }
}

NotificationManager.propTypes = {
  isProcessing: React.PropTypes.bool.isRequired,
  notification: React.PropTypes.object,
  onMount: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  isProcessing: state.notifications.isProcessing,
  notification: state.notifications.current,
});

const mapDispatch = (dispatch) => ({
  onMount: () => dispatch(showNotification()),
});

export default connect(mapState, mapDispatch)(NotificationManager);
