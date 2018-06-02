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
  return {communicationURL: informationStore.informationData.communicationURL};
})

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communicationURL: "http://localhost:8000/media/videos/temp_arJXLuY.mp4"
    };
  }

  render() {
    console.log(this.props.communicationURL);
    return (<div className="video">
      <h1>WiFi is granted</h1>
    </div>);
  }
}

Video.propTypes = {
  communicationURL: PropTypes.string
};

export default Video;
