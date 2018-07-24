import React from "react";
import {render} from "react-dom";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import {I18nextProvider} from "react-i18next";

import i18n from "./constants/i18n";

import App from "./App";
import Portal from "./views/Portal";
import store from "./store";

// Import Flag Icons Set
// import 'flag-icon-css/css/flag-icon.min.css';
import "../scss/main.scss";
// import "react-select/dist/react-select.css";
import "react-block-ui/style.css";

// By using <Provider />, the store will be made available for all the components in your application.

render(<I18nextProvider i18n={i18n}>
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact={true} path="/portal/:target/:mac_address/:token/" component={Portal}/>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
  </Provider>
</I18nextProvider>, document.getElementById("root"));
