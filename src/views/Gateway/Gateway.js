import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

import Partner from "./Partner";
import WayConnect from "./WayConnect";
import Loader from "../../components/Loader";

import {fetchConnection} from "../../actions/informationActions";

@connect((store) => {
  return {};
})

class Gateway extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };

    this.props.dispatch(fetchConnection());
  }
  render() {

    return (<div className="gateway">
      <Route exact path="/gateway/partner" name="Partner" component={Partner}/>
      <Route exact path="/gateway/way-connect" name="Way-Connect" component={WayConnect}/>
    </div>);
  }
}

Gateway.propTypes = {
  dispatch: PropTypes.func,
};

export default Gateway;
