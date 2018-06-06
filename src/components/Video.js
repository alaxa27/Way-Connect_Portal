import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Button} from "reactstrap";

import {Player} from "video-react";
import "video-react/dist/video-react.css"; // import css

import Navbar from "./Navbar";

import {postClaim} from "../actions/claimActions";

@connect((store) => {
  let informationStore = store.information;
  return {informationData: informationStore.informationData};
})

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    window.location.href = `http://192.168.220.2:2050/nodogsplash_auth/?tok=${this.props.informationData.token}&redir=${this.props.informationData.redir}`;

  }

  render() {
    return (<div className="video">
      <h1>WiFi is granted</h1>
    </div>);
  }
}

Video.propTypes = {
  informationData: PropTypes.object
};

export default Video;
