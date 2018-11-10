/**
 *
 * Slider
 *
 */

import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import rightArrow from 'images/right-arrow_knob.png';

import Knob from './Knob';
import SliderText from './SliderText';
import SliderWrapper from './SliderWrapper';

const Arrow = styled.img``;

/* eslint-disable react/prefer-stateless-function */
class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      knobRef: React.createRef(),
      sliderWrapperRef: React.createRef(),
      sliderWrapperWidth: 0,
      sliderWrapperPadding: 5,
      position: {
        x: 0,
        y: 0,
      },
      dropped: false,
    };

    this.handleKnobDrag = this.handleKnobDrag.bind(this);
    this.handleKnobDrop = this.handleKnobDrop.bind(this);
  }

  componentDidMount() {
    this.setState(prevState => ({
      sliderWrapperWidth:
        prevState.sliderWrapperRef.current.offsetWidth -
        prevState.knobRef.current.offsetWidth -
        2 * prevState.sliderWrapperPadding,
    }));
  }

  handleKnobDrop(e, d) {
    if (d.x >= this.state.sliderWrapperWidth) {
      console.log('DROPPED');
    }
    this.setState(prevState => ({
      position: {
        x: d.x < prevState.sliderWrapperWidth ? 0 : d.x,
        y: 0,
      },
      dropped: true,
    }));
  }

  handleKnobDrag() {
    this.setState({
      dropped: false,
    });
  }

  render() {
    return (
      <SliderWrapper
        ref={this.state.sliderWrapperRef}
        padding={this.state.sliderWrapperPadding}
      >
        <Draggable
          axis="x"
          bounds={{
            left: 0,
            right: this.state.sliderWrapperWidth,
          }}
          position={this.state.position}
          onStart={this.handleKnobDrag}
          onStop={this.handleKnobDrop}
        >
          <Knob ref={this.state.knobRef} dropped={this.state.dropped}>
            <Arrow src={rightArrow} />
          </Knob>
        </Draggable>
        <SliderText>WiFi</SliderText>
      </SliderWrapper>
    );
  }
}

Slider.propTypes = {};

export default Slider;
