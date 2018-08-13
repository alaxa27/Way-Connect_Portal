import React, {Component} from "react";
import PropTypes from "prop-types";

class Countdown extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className={"countdown " + this.props.className}>
      <svg>
        <circle r="80" cx="85" cy="85"></circle>
      </svg>
      {this.props.children}
    </div>);
  }
}

Countdown.defaultProps = {
  className: ""
};

Countdown.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object
};

export default Countdown;
