/**
 *
 * Player
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Player, ControlBar, Shortcut, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css'; // import css

import VideoPlayerWrapper from './VideoPlayerWrapper';
/* eslint-disable react/prefer-stateless-function */

const playerShortcuts = [
  {
    keyCode: 39, // Right arrow
    handle: () => {},
  },
  {
    keyCode: 76, // LKey
    handle: () => {},
  },
];

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.playerRef = React.createRef();
    this.handleStateChange = this.handleStateChange.bind(this);
    this.playVideo = this.playVideo.bind(this);
  }

  componentDidMount() {
    this.playerRef.current.subscribeToStateChange(this.handleStateChange);
    this.playVideo();
  }

  handleStateChange(state, prevState) {
    if (state.paused && !state.ended) {
      this.playVideo();
    }
    if (state.seeking && !prevState.seeking) {
      this.playerRef.current.seek(prevState.currentTime);
    }
    const { currentTime, duration } = state;
    const progress = currentTime / duration;

    this.props.onProgress(progress, currentTime);
  }

  playVideo() {
    this.playerRef.current.play();
  }

  render() {
    const { video } = this.props;

    return (
      <VideoPlayerWrapper>
        <Player playsInline preload="auto" ref={this.playerRef}>
          <source src={video} />
          <BigPlayButton position="center" />
          <ControlBar disabled />
          <Shortcut clickable={false} shortcuts={playerShortcuts} />
        </Player>
      </VideoPlayerWrapper>
    );
  }
}

VideoPlayer.defaultProps = {};

VideoPlayer.propTypes = {
  video: PropTypes.string.isRequired,
  onProgress: PropTypes.func,
};

export default VideoPlayer;
