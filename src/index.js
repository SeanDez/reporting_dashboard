import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider as ReactReduxProvider} from "react-redux";
import ReactReduxWrappedApp from './App';
import reduxStore from './reducer'

import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <ReactReduxProvider store={reduxStore}>
    <ReactReduxWrappedApp />
  </ReactReduxProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
