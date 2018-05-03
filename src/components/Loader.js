import React, {Component} from "react";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";

class Navbar extends Component {

  renderLoader(spinning, children) {
    if (spinning) {
      return (<div className="loader">
        <Loader type="Rings" color={this.props.color} height={this.props.height} width={this.props.width}/>
      </div>)
    } else {
      return (children)
    }
  }

  render() {
    return (<div>
      {this.renderLoader(this.props.spinning, this.props.children)}
    </div>);
  }
}

Navbar.defaultProps = {
  color: "#333333",
  height: 100,
  width: 100,
  spinning: true
};

export default Navbar;
