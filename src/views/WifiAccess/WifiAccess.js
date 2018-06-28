import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import i18n from "../../constants/i18n";

@connect((store) => {
  let informationStore = store.information;
  return {informationData: informationStore.informationData};
})

class WifiAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    window.location.href = `http://192.168.220.2:2050/nodogsplash_auth/?tok=${this.props.informationData.token}&redir=${this.props.informationData.redir}`;

  }

  render() {
    return (<div className="video">
      <h1>{i18n.t("wifi-granted")}</h1>
    </div>);
  }
}

WifiAccess.propTypes = {
  informationData: PropTypes.object
};

export default WifiAccess;
