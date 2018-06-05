/* global document */

import React from "react";
import {render} from "react-dom";
import { HashRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";

import App from "./App";
import Portal from "./components/Portal";
import store from "./store";

// Import Flag Icons Set
// import 'flag-icon-css/css/flag-icon.min.css';
import "../scss/main.scss";
import "react-select/dist/react-select.css";

// By using <Provider />, the store will be made available for all the components in your application.

render(<Provider store={store}>
  <Router>
    <Switch>
      <Route exact path="/portal/:mac_address/:API_Key/:token/" component={Portal}/>
      <Route path="/" component={App}/>
    </Switch>
  </Router>
</Provider>, document.getElementById("root"));
