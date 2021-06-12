import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const token = window.localStorage.getItem('token') || '';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          // eslint-disable-next-line react/prop-types
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
