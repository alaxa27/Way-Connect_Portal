import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Row, Col} from "reactstrap";

@connect((store) => {
  let informationStore = store.information
  return {isHotel: informationStore.informationData.isHotel}
})

class Dashboard extends Component {
  render() {
    const isHotel = false;
    return (<div className="dashboard">
      <Button>
        <i className="fa fa-wifi"></i>
      </Button>
      <h4>
        Join the WiFi Network
      </h4>
      <Link to={"/" + (this.props.isHotel ? "claim" : "fidelity")}>
        <Button>
          <i className={"fa fa-" + (this.props.isHotel ? "exclamation-triangle" : "balance-scale")}></i>
        </Button>
      </Link>
      <h4>
        {this.props.isHotel ? "Make a Claim" : "Fidelity Bonus"}
      </h4>
    </div>);
  }
}

export default Dashboard;
