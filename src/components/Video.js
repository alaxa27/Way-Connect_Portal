import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

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
      <video>
        <source src={this.state.communicationURL} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
    </div>);
  }
}

Video.propTypes = {
  communicationURL: PropTypes.string
};

export default Video;
