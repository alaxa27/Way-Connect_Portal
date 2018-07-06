import React, {Component} from "react";
import PropTypes from "prop-types";
import {translate} from "react-i18next";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";

@translate("translations")

class Congratulations extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {t, i18n} = this.props;
    return (<div className="congratulations">
      <div className="star">
        <div className="bg-gradient">
          <div className="bg-gray">
            <i className="fas fa-star"/>
          </div>
        </div>
      </div>
      <h2>{t("fidelity.profile.congratulations.congratulations")}</h2>
      <Link to="/fidelity" className="btn-continue">
        <Button className="btn-continue">
          {t("fidelity.profile.congratulations.continue")}
        </Button>
      </Link>
    </div>);
  }
}

Congratulations.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object
};

export default Congratulations;
