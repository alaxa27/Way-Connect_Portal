import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button} from "reactstrap";

class ActionButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {link, text, icon, show} = this.props;
    if (show) {
      return (<div>
        <Link to={"/" + link}>
          <Button className={this.props.className}>
            <i className={"fa fa-" + icon}></i>
          </Button>
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

ActionButton.propTypes = {
  show: PropTypes.bool,
  link: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string
};

export default ActionButton;
