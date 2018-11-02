import React, {Component} from "react";
import PropTypes from "prop-types";

class Countdown extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className={"countdown " + this.props.className}>
      <svg>
        <circle r={this.props.r} cx={parseInt(this.props.r) + parseInt(this.props.width)} cy={parseInt(this.props.r) + parseInt(this.props.width)}></circle>
      </svg>
      {this.props.children}
    </div>);
  }
}

Countdown.defaultProps = {
  className: "",
  r: "80",
  width: "5"
};

Countdown.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
  r: PropTypes.string,
  width: PropTypes.string
};

export default Countdown;
