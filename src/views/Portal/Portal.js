import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {dispatchInformations} from "../../actions/informationActions";

@connect((store) => {
  return {};
})

class Portal extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    match: PropTypes.shape({
      params: PropTypes.shape({target: PropTypes.string, token: PropTypes.string, mac_address: PropTypes.string, auth_action: PropTypes.string})
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      target: this.props.match.params.target
    };

    delete this.props.match.params.target;
    this.props.dispatch(dispatchInformations(this.props.match.params));

  }
  render() {
    return (<Redirect to={`/${this.state.target}`}/>);
  }
}

export default Portal;
