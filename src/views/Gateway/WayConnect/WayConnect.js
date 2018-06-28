import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Button } from "reactstrap";

import Loader from "../../../components/Loader";

@connect((store) => {
  let informationStore = store.information;
  return {fetching: informationStore.fetching, fetched: informationStore.fetched};
})

class WayConnect extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (<div className="way-connect">
      <Button className="way-btn" onClick={() => {
          this.props.history.push("/gateway/partner");
        }}>
        <Loader spinning={this.props.fetching || !this.props.fetched}>
          <img src="/assets/logo-white.png" className="logo"/>
        </Loader>
      </Button>
      <h4>{"Way-Connect"}</h4>
    </div>);
  }
}

WayConnect.propTypes = {
  fetching: PropTypes.bool,
  fetched: PropTypes.bool,
  history: PropTypes.object
};

export default WayConnect;
