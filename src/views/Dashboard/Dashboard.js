import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button, Row, Col} from "reactstrap";

import i18n from "../../constants/i18n";

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
      <ActionButton link="fidelity" icon="hand-holding-usd" text={i18n.t("dashboard.fidelity")} className="pulse" show={this.props.establishment_type !== "hotel"} />
      <ActionButton link="wifi-access" icon="wifi" text={i18n.t("dashboard.wifi")} show={true} />
      <ActionButton link="claim" icon="exclamation-triangle" text={i18n.t("dashboard.claim")} show={this.props.establishment_type === "hotel"} />
    </div>);
  }
}

Dashboard.propTypes = {
  establishment_type: PropTypes.string,
  dispatch: PropTypes.func,
};

export default Dashboard;
