import React, {Component} from "react";
import PropTypes from "prop-types";

class Navbar extends Component {
  render() {
    return (<div className="navbar">
      <div className="back-button" onClick={(() => {
          this.props.goBack();
        }).bind(this)}>
        <i className="fa fa-angle-left"></i>
      </div>
      <h4>{this.props.title}</h4>
    </div>);
  }
}

export default Navbar;
