import React, {Component} from "react";
import PropTypes from "prop-types";

class Navbar extends Component {
  render() {
    return (<div className="navbar">
      <div className="back-button" onClick={(() => {
          this.props.history.push(this.props.goBack);
        }).bind(this)}>
        <i className="fa fa-angle-left"></i>
      </div>
      <h4>{this.props.title}</h4>
    </div>);
  }
}

Navbar.propTypes = {
  goBack: PropTypes.string,
  title: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default Navbar;
