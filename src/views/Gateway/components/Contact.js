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
  }

  render() {
    return (<div className="contact">
      <Countdown className="pulse">
        <ActionButton gradient={false} link={this.props.redirection} className="countdown__children pulse" icon="phone" show={true}/>
      </Countdown>
    </div>);
  }
}

Contact.propTypes = {
  redirection: PropTypes.string.isRequired
};

export default Contact;
