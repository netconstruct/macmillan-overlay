import React, { Component, PropTypes } from 'react';
import './Notification.css';

class Notification extends Component {
  static defaultProps = {
    notification: null,
  }
  state = {
    hasChanged: true,
  }
  componentWillReceiveProps(nextProps) {
    const prevNotification = this.props.notification;
    const nextNotification = nextProps.notification;

    this.setState({
      hasChanged: (prevNotification.id !== nextNotification.id),
    });
  }
  render() {
    const { notification } = this.props;
    const { hasChanged } = this.state;
    return (
      <div className={hasChanged ? 'notification notification--animate' : 'notification'}>
        <div className="notification__inner">
          <h1 className="notification__title">{notification.title}</h1>
          <p className="notification__subtitle">{notification.subtitle}</p>
          <p className="notification__message">{notification.message}</p>
        </div>
      </div>
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.object,
};

export default Notification;
