import React, {Component} from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";

@translate("translations")

class Congratulations extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {t, i18n} = this.props;
    return (<div>
      {t("fidelity.profile.congratulations.congratulations")}
    </div>);
  }
}

Congratulations.propTypes = {
t: PropTypes.func,
i18n: PropTypes.object
};

export default Congratulations;
