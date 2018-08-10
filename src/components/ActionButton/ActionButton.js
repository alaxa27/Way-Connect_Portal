import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button} from "reactstrap";

class ActionButton extends Component {
  constructor(props) {
    super(props);

    this._renderInner = this._renderInner.bind(this);
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

  render() {
    const {link, text, icon, show, gradient} = this.props;
    if (show) {
      return (<div>
        <Link to={link}>
          <div className={this.props.className + " circle btn" + (
              this.props.gradient
              ? " circle__gradient"
              : "")}>
            {this._renderInner(gradient)}
          </div>
        </Link>
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
  text: ""
};
ActionButton.propTypes = {
  show: PropTypes.bool,
  link: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  gradient: PropTypes.bool
};

export default ActionButton;
