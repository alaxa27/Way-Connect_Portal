import React, {Component} from "react";
import PropTypes from "prop-types";

class Navbar extends Component {
  render() {
    return (<div className="navbar">
      <div className="nav-button" onClick={(() => {
          this.props.history.push(this.props.goBack);
        }).bind(this)}>
        <i className="fa fa-angle-left"></i>
      </div>
      <h4>{this.props.title}</h4>
      <div className="nav-button">
        <i className={`fa ${this.props.moreIcon}`} onClick={(() => {
            this.props.history.push(this.props.goMore);
          }).bind(this)}></i>
      </div>
    </div>);
  }
}

Navbar.propTypes = {
  goBack: PropTypes.string,
  title: PropTypes.string,
  history: PropTypes.shape({push: PropTypes.func}),
  moreIcon: PropTypes.string,
  goMore: PropTypes.string
};

export default Navbar;
