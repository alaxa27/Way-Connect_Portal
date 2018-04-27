import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Row, Col} from "reactstrap";

class Dashboard extends Component {
  render() {

    return (<div className="dashboard">
      <Button>
        <i className="fa fa-wifi"></i>
      </Button>
      <h4>
        Join the WiFi Network
      </h4>
      <Link to="/claim">
        <Button>
          <i className="fa fa-exclamation-triangle"></i>
        </Button>
      </Link>
      <h4>
        Make a Claim
      </h4>
    </div>);
  }
}

export default Dashboard;
