import React, {Component} from "react";
import LoaderSpinner from "react-loader-spinner";
import PropTypes from "prop-types";

class Loader extends Component {

  renderLoader(spinning, children) {
    if (spinning) {
      return (<div className="loader">
        <LoaderSpinner type="Rings" color={this.props.color} height={this.props.height} width={this.props.width}/>
      </div>);
    } else {
      return (children);
    }
  }

  render() {
    return (<div>
      {this.renderLoader(this.props.spinning, this.props.children)}
    </div>);
  }
}

Loader.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  spinning: PropTypes.bool,
  children: PropTypes.element
};

Loader.defaultProps = {
  color: "#333333",
  height: 100,
  width: 100,
  spinning: true
};

export default Loader;
