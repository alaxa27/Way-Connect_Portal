import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {translate} from "react-i18next";

import Countdown from "../../../components/Countdown";
import ActionButton from "../../../components/ActionButton";

@translate("translations")
class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ticking: true
    };
    this._renderInner = this._renderInner.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.show !== this.props.show) {
      this.timerHandle = setTimeout(() => {
        this.setState({ticking: false});
      }, 4000);
    }
  }

  componentWillUnmount = () => {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle); 
      this.timerHandle = 0;
    }
  };

  _renderInner() {
    return (<div className="contact">
      {
        (
          this.state.ticking
          ? null
          : <Redirect to="/dashboard"/>)
      }
      <Countdown className="pulse">
        <ActionButton gradient={false} action={this.props.action} className="countdown__children" icon="phone" show={true}/>
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
  children: PropTypes.object,
  history: PropTypes.shape({push: PropTypes.func})
};

export default Contact;
