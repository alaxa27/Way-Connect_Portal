import React, {Component} from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import Claim from "./components/Claim"
import Fidelity from "./components/Fidelity"

class App extends Component {
  render() {
    return (<div>
      <div className="background"></div>
      <div className="app">
        <Route exact="exact" path="/" name="Login" component={Login}/>
        <Route path="/login" name="Login" component={Login}/>
        <Route path="/register" name="Register" component={Register}/>
        <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
        <Route path="/claim" name="Claim" component={Claim}/>
        <Route path="/fidelity" name="Fidelity" component={Fidelity}/>
      </div>
    </div>);
  }
}

export default App;
