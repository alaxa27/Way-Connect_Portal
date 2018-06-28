import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Row} from "reactstrap";
import {Player, ControlBar, Shortcut} from "video-react";
import "video-react/dist/video-react.css"; // import css

import i18n from "../../../constants/i18n";

import Loader from "../../../components/Loader";

import {acknowledgeCommunication} from "../../../actions/gatewayActions";

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

class Partner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };

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
      <img src="/assets/mustache.png" className="logo"/>
      <Row>
        {i18n.t("gateway.partner.offer")}
      </Row>
      <Row className="go-block">
        <p>{i18n.t("gateway.partner.under")}</p>
        <Button onClick={this.playVideo.bind(this)} block={true}>
          {"15 " + i18n.t("gateway.partner.seconds")}
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

Partner.propTypes = {
  acknowledging: PropTypes.bool,
  acknowledged: PropTypes.bool,
  fetching: PropTypes.bool,
  fetched: PropTypes.bool,
  dispatch: PropTypes.func,
  history: PropTypes.object
};

export default Partner;
