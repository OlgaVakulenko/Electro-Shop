/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar } from '../../store/notification/actions';

function Notifier(props) {
  let displayed = [];

  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id) => {
    displayed = displayed.filter((key) => id !== key);
  };

  useEffect(() => {
    const { notifications = [] } = props;

    notifications.forEach(({
      key,
      message,
      options = {},
      dismissed = false,
    }) => {
      if (dismissed) {
        props.closeSnackbar(key);
        return;
      }
      if (displayed.includes(key)) return;
      props.enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, k) => {
          if (options.onClose) {
            options.onClose(event, reason, k);
          }
        },
        onExited: (event, k) => {
          props.removeSnackbar(k);
          removeDisplayed(k);
        },
      });
      storeDisplayed(key);
    });
  });

  return null;
}

const mapStateToProps = (store) => ({
  notifications: store.notification.notifications,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ removeSnackbar }, dispatch);

const NotifierConnect = withSnackbar(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifier));

export {
  NotifierConnect as Notifier,
};
