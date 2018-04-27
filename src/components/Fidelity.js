import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Row, Col} from "reactstrap";

class Dashboard extends Component {



  calcHeight(fidelity) {
      const height = 300;
      return ((1 - fidelity) * height).toString();
  }

  render() {
    let fidelity_rate = 0.64;
    return (<div className="fidelity">
      <div className="logo">
        <div className="logo-white">
          <img src="assets/logo-white.png"></img>
        </div>
        <div className="logo-black" style={{height: this.calcHeight(fidelity_rate) + "px"}}>
          <img src="assets/background.svg"></img>
        </div>
      </div>
    </div>);
  }
}

export default Dashboard;
