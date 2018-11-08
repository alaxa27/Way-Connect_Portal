/**
 *
 * RangeSlider
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Bar from './Bar';
import Knob from './Knob';
import Value from './Value';
import BarWrapper from './BarWrapper';

/* eslint-disable react/prefer-stateless-function */
class RangeSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rangeSliderRef: React.createRef(),
      rangeSliderWidth: 0,
      value1: 0.2,
      value2: 0.9,
    };
  }

  componentDidMount() {
    this.setState(prevState => ({
      rangeSliderWidth: prevState.rangeSliderRef.current.offsetWidth,
    }));
  }

  render() {
    const { value1, value2, rangeSliderRef, rangeSliderWidth } = this.state;
    const knob1Position = value1 * rangeSliderWidth;
    const knob2Position = value2 * rangeSliderWidth;
    return (
      <BarWrapper ref={rangeSliderRef}>
        <Bar width={value1} />
        <Knob value={knob1Position}>
          <Value>{value1}</Value>
        </Knob>
        <Bar transparent width={value2 - value1} />
        <Knob value={knob2Position}>
          <Value>{value2}</Value>
        </Knob>
        <Bar width={1 - value2} />
      </BarWrapper>
    );
  }
}

RangeSlider.propTypes = {};

export default RangeSlider;
