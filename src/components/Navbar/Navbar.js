import React, {Component} from "react";
import PropTypes from "prop-types";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this._renderBackButton = this._renderBackButton.bind(this);
  }
  _renderBackButton() {
    if (this.props.goBack !== "") {
      return (<div className="nav-button" onClick={(() => {
          this.props.history.push(this.props.goBack);
        }).bind(this)}>
        <i className="fa fa-angle-left"></i>
      </div>);
    } else {
      return null;
    }
  }
  render() {
    return (<div className="navbar">
      {this._renderBackButton()}
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
