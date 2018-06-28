import React, {Component} from "react";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import PropTypes from "prop-types";

@translate("translations")
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
    let {t, i18n} = this.props;
    return (<div className="video">
      <h1>{t("wifi-granted")}</h1>
    </div>);
  }
}

WifiAccess.propTypes = {
  informationData: PropTypes.object,
  t: PropTypes.func,
  i18n: PropTypes.object
};

export default WifiAccess;
