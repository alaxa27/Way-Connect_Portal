/* global document */

import React from "react";
import {render} from "react-dom";
import { BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from "react-redux";

import App from "./App";
import store from "./store";

// Import Flag Icons Set
// import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/scss/font-awesome.scss';

// By using <Provider />, the store will be made available for all the components in your application.

render(<Provider store={store}>
  <Router>
    <Route path="/" component={App}/>
  </Router>
</Provider>, document.getElementById("root"));
