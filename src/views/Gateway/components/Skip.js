import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {translate} from "react-i18next";

import Countdown from "../../../components/Countdown";
import ActionButton from "../../../components/ActionButton";

@translate("translations")
class Skip extends Component {

  constructor(props) {
    super(props);
    this._renderInner = this._renderInner.bind(this);
  }

  _renderInner() {
    return (<div>
      <Countdown className={`${ (
          this.props.skippable
          ? "pulse"
          : "")} skip`} r="30" width="4">
        <ActionButton gradient={this.props.skippable} icon={(this.props.skippable ? "arrow-right" : null)} show={true} className="countdown__children skip" action={() => {
            if (this.props.skippable) {
              this.props.onClick();
            }
          }}>{Math.floor(this.props.time)}</ActionButton>
      </Countdown>
    </div>);
  }

  render() {
    return (<React.Fragment>
      {this._renderInner()}
    </React.Fragment>);
  }
}

Skip.defaultProps = {
  skippable: true
};

Skip.propTypes = {
  skippable: PropTypes.bool,
  time: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  history: PropTypes.shape({push: PropTypes.func})
};

export default Skip;
