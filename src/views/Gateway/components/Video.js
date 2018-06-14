import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import { Button } from "reactstrap";

import {axiosInstance} from "../../constants/ApiConfig";

import {fetchInformation} from "../../actions/informationActions";

const playerShortcuts = [
  {
    keyCode: 39, // Right arrow
    handle: (player, actions) => {
    }
  },
  {
    keyCode: 76, // LKey
    handle: (player, actions) => {
    }
  }
];

@connect((store) => {
  let informationStore = store.information;
  return {fetched: informationStore.fetched};
})


 class Gateway extends Component {
  static propTypes = {
    fetched: PropTypes.bool,
    dispatch: PropTypes.func,
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string,
        mac_address: PropTypes.string,
        API_Key: PropTypes.string,
        auth_action: PropTypes.string,
      })
    })
  }

  constructor(props) {
    super(props);
    axiosInstance.defaults.headers.common["X-API-Key"] = this.props.match.params.API_Key;
    this.props.dispatch(fetchInformation({...this.props.match.params}));

  }
  render() {


    return (
      <div>

      </div>
    );
  }
}

export default Gateway;
