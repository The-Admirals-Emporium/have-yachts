import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './app';
import * as serviceWorker from '../stripe/src/serviceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import 'bootstrap/dist/css/bootstrap.css';

// establishes socket connection
import './socket';

// Where is the right place to do this?
//window.localStorage.clear()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
