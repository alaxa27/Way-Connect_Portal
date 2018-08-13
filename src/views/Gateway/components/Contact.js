import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {translate} from "react-i18next";

import Countdown from "../../../components/Countdown";
import ActionButton from "../../../components/ActionButton";

@translate("translations")
class Contact extends Component {

  constructor(props) {
    super(props);
    this._renderInner = this._renderInner.bind(this);
  }

  _renderInner() {
    return (<div className="contact">
      <Countdown className="pulse">
        <ActionButton gradient={false} action={this.props.action} className="countdown__children pulse" icon="phone" show={true}/>
      </Countdown>
    </div>);
  }

  render() {
    let {show} = this.props;
    return (<React.Fragment>
      <div className={(
          show
          ? "blur"
          : "")}>
        {this.props.children}
      </div>
      {
        (
          show
          ? this._renderInner()
          : null)
      }
    </React.Fragment>);
  }
}

Contact.defaultProps = {
  show: true
};

Contact.propTypes = {
  action: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.object
};

export default Contact;
