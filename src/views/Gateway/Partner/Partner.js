import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {Button, Row} from "reactstrap";
import Draggable from "react-draggable";
import {Player, ControlBar, Shortcut} from "video-react";
import "video-react/dist/video-react.css"; // import css

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

@translate("translations")
@connect((store) => {
  let informationStore = store.information;
  let gatewayStore = store.gateway;
  return {fetching: informationStore.fetching, fetched: informationStore.fetched, acknowledging: gatewayStore.acknowledging, acknowledged: gatewayStore.acknowledged};
})

class Partner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      slider: {
        position: {
          x: 0,
          y: 0
        },
        dropped: false
      }
    };
    this.playVideo = this.playVideo.bind(this);
    this.handleSliderDrag = this.handleSliderDrag.bind(this);
    this.handleSliderDrop = this.handleSliderDrop.bind(this);
  }

  handleSliderDrop(e, d) {
    if (d.x >= 250) {
      this.playVideo();
    }
    this.setState({
      slider: {
        position: {
          x: (
            d.x < 250
            ? 0
            : d.x),
          y: 0
        },
        dropped: true
      }
    });
  }

  handleSliderDrag() {
    this.setState({
      slider: {
        ...this.state.slider,
        dropped: false
      }
    });
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
    let {t, i18n} = this.props;
    return (<div className="gateway">
      <img src="/assets/mustache.png" className="logo"/>
      <Row>
        {t("gateway.partner.offer")}
      </Row>
      <Row className="go-block">
        {/*<p>{t("gateway.partner.under")}</p>
        <Button onClick={this.playVideo.bind(this)} block={true}>
          {"15 " + t("gateway.partner.seconds")}
        </Button>*/}
        <div className="slider-button">
          <Draggable axis="x" bounds={{
              left: 0,
              right: 250
            }} position={this.state.slider.position} onStart={this.handleSliderDrag} onStop={this.handleSliderDrop}>
            <div className={`handle ${(this.state.slider.dropped ? "dropped" : "")}`}>
              <i className="fas fa-chevron-right"></i>
            </div>
          </Draggable>
          <p>Slide to Continue</p>
        </div>
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
  history: PropTypes.object,
  t: PropTypes.func,
  i18n: PropTypes.object
};

export default Partner;
