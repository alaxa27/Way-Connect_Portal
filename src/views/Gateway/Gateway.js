import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Button, Row} from "reactstrap";
import {Player, ControlBar, Shortcut} from "video-react";
import "video-react/dist/video-react.css"; // import css

import Loader from "../../components/Loader";

import {fetchConnection} from "../../actions/informationActions";
import {acknowledgeCommunication} from "../../actions/gatewayActions";

const playerShortcuts = [
  {
    keyCode: 39, // Right arrow
    handle: (player, actions) => {}
  }, {
    keyCode: 76, // LKey
    handle: (player, actions) => {}
  }
];

@connect((store) => {
  let informationStore = store.information;
  let gatewayStore = store.gateway;
  return {fetching: informationStore.fetching, fetched: informationStore.fetched, acknowledging: gatewayStore.acknowledging, acknowledged: gatewayStore.acknowledged};
})

class Gateway extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };

    this.props.dispatch(fetchConnection());

  }

  handleStateChange(state, prevState) {
    if (state.ended && !this.props.acknowledging && !this.props.acknowledged) {
      this.props.dispatch(acknowledgeCommunication({history: this.props.history}));
    }
  }

  playVideo() {
    if (!this.props.fetching && this.props.fetched) {
      this.setState({playing: true});
      this.player.subscribeToStateChange(this.handleStateChange.bind(this));
      this.player.play();
      this.player.toggleFullscreen();
    }
  }

  render() {

    return (<div className="gateway">
      <img src="/assets/logo.png" className="logo"/>
      <Row>
        {"We offer you a high Speed Wi-Fi and a discount on your next Order."}
      </Row>
      <Row className="go-block">
        <p>{"In under"}</p>
        <Button onClick={this.playVideo.bind(this)} block="block">
          {"15 seconds"}
        </Button>
      </Row>

      <div className={(
          this.state.playing
          ? "video-playing"
          : "video-not-playing")}>
        <Player ref={(c) => {
            this.player = c;
          }}>
          <source src="/assets/trailer_hd.mp4"/>
          <ControlBar disabled={true}/>
          <Shortcut clickable={false} shortcuts={playerShortcuts}/>
        </Player>
      </div>

    </div>);
  }
}

Gateway.propTypes = {
  acknowledging: PropTypes.bool,
  acknowledged: PropTypes.bool,
  fetching: PropTypes.bool,
  fetched: PropTypes.bool,
  dispatch: PropTypes.func,
  history: PropTypes.object
};

export default Gateway;
