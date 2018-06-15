import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Row, Col} from "reactstrap";

import ActionButton from "./components/ActionButton";

@connect((store) => {
  let informationStore = store.information;
  return {
    establishment_type: informationStore.informationData.establishment_type,
  };
})

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="dashboard">
      <ActionButton link="wifi-access" icon="wifi" text="Join the WiFi Network" show={true} />
      <ActionButton link="claim" icon="exclamation-triangle" text="Make a Claim" show={this.props.establishment_type === "hotel"} />
      <ActionButton link="fidelity" icon="hand-holding-usd" text="Fidelity Bonus" show={this.props.establishment_type !== "hotel"} />
    </div>);
  }
}

Dashboard.propTypes = {
  establishment_type: PropTypes.string,
  dispatch: PropTypes.func,
};

export default Dashboard;
