import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect from="/" to="/login" />
        </div>
      </Router>
    );
  }
}

export default App;
