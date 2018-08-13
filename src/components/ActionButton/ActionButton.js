import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button} from "reactstrap";

class ActionButton extends Component {
  constructor(props) {
    super(props);

    this._renderInner = this._renderInner.bind(this);
    this._runAction = this._runAction.bind(this);
  }

  _renderInner(gradient) {
    if (gradient) {
      return (<div className="circle__inner">
        <i className={"fa fa-" + this.props.icon}></i>
      </div>);
    } else {
      return (<i className={"fa fa-" + this.props.icon}></i>);
    }
  }

  _runAction() {
    this.props.action();
  }

  render() {
    const {link, text, icon, show, gradient} = this.props;
    if (show) {
      return (<div>
        <div onClick={this._runAction} className={this.props.className + " circle btn" + (
              this.props.gradient
              ? " circle__gradient"
              : "")}>
          {this._renderInner(gradient)}
        </div>
        <h4>
          {text}
        </h4>
      </div>);
    } else {
      return null;
    }
  }
}
ActionButton.defaultProps = {
  gradient: false,
  className: "",
  text: "",
  action: () => {}
};
ActionButton.propTypes = {
  show: PropTypes.bool,
  link: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  gradient: PropTypes.bool,
  action: PropTypes.func
};

export default ActionButton;
