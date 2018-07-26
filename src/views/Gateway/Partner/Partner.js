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
  return {
    tour: informationStore.informationData.tour,
    fetching: informationStore.fetching,
    fetched: informationStore.fetched,
    acknowledging: gatewayStore.acknowledging,
    acknowledged: gatewayStore.acknowledged,
    establishmentData: gatewayStore.establishmentData
  };
})

class Partner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      slider: {
        ref: React.createRef(),
        handleRef: React.createRef(),
        position: {
          x: 0,
          y: 0
        },
        dropped: false
      }
    };

    this.playerRef = React.createRef();
    this.playVideo = this.playVideo.bind(this);
    this.handleSliderDrag = this.handleSliderDrag.bind(this);
    this.handleSliderDrop = this.handleSliderDrop.bind(this);
  }

  componentDidMount() {
    this.setState({
      slider: {
        ...this.state.slider,
        width: this.state.slider.ref.current.offsetWidth - this.state.slider.handleRef.current.offsetWidth
      }
    });
  }

  handleSliderDrop(e, d) {
    if (d.x >= this.state.slider.width) {
      this.playVideo();
    }
    this.setState({
      slider: {
        ...this.state.slider,
        position: {
          x: (
            d.x < this.state.slider.width
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
    if (state.seeking && !prevState.seeking) {
      this.playerRef.current.seek(prevState.currentTime);
    }
    if (state.ended && !this.props.acknowledging && !this.props.acknowledged) {
      this.props.dispatch(acknowledgeCommunication({history: this.props.history}));
    }
  }

  playVideo() {
    if (!this.props.fetching && this.props.fetched) {
      this.setState({playing: true});
      this.playerRef.current.subscribeToStateChange(this.handleStateChange.bind(this));
      this.playerRef.current.play();
      // this.playerRef.current.toggleFullscreen();
    }
  }

  render() {
    let {t, i18n} = this.props;
    return (<div className="gateway">
      <div className={`establishment establishment__${this.props.establishmentData.background_color}`}>
        <img src={this.props.establishmentData.picture} className="logo"/>
      </div>
      <Row>
        {t("gateway.partner.offer")}
      </Row>
      <Row className="go-block">
        {/*<p>{t("gateway.partner.under")}</p>
        <Button onClick={this.playVideo.bind(this)} block={true}>
          {"15 " + t("gateway.partner.seconds")}
        </Button>*/
        }
        <div ref={this.state.slider.ref} className="slider-button">
          <Draggable axis="x" bounds={{
              left: 0,
              right: this.state.slider.width
            }} position={this.state.slider.position} onStart={this.handleSliderDrag} onStop={this.handleSliderDrop}>
            <div ref={this.state.slider.handleRef} className={`handle ${ (
                this.state.slider.dropped
                ? "dropped"
                : "")}`}>
              <i className="fas fa-chevron-right"></i>
            </div>
          </Draggable>
          <p>{t("gateway.partner.slider")}</p>
        </div>
      </Row>

      <div className={(
          this.state.playing
          ? "video-playing"
          : "video-not-playing")}>
        <Player playsInline={true} preload="auto" ref={this.playerRef}>
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
  tour: PropTypes.bool,
  fetching: PropTypes.bool,
  fetched: PropTypes.bool,
  establishmentData: PropTypes.shape({picture: PropTypes.string, background_color: PropTypes.string}),
  dispatch: PropTypes.func,
  history: PropTypes.object,
  t: PropTypes.func,
  i18n: PropTypes.object
};

export default Partner;
