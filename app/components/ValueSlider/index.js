/**
 *
 * ValueSlider
 *
 */

import React from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Bar from './Bar';
import Knob from './Knob';
import Value from './Value';
import BarWrapper from './BarWrapper';

/* eslint-disable react/prefer-stateless-function */
class ValueSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rangeSliderRef: React.createRef(),
      rangeSliderWidth: 0,
      position1: 0,
      position2: 0,
    };

    this.handleDrag1 = this.handleDrag1.bind(this);
    this.handleDrag2 = this.handleDrag2.bind(this);
    this.renderSecondKnob = this.renderSecondKnob.bind(this);
  }

  componentDidMount() {
    this.setState(prevState => ({
      rangeSliderWidth: prevState.rangeSliderRef.current.offsetWidth,
    }));
  }

  handleDrag1(e, d) {
    this.setState({
      position1: d.x,
    });
  }

  handleDrag2(e, d) {
    this.setState({
      position2: d.x,
    });
  }

  renderSecondKnob() {
    const { position1, position2, rangeSliderWidth } = this.state;
    const { min, max } = this.props;

    const value1 = position1 / rangeSliderWidth;
    const value2 = (rangeSliderWidth + position2) / rangeSliderWidth;
    const bounds2 = {
      left: position1 - rangeSliderWidth + 16,
      right: 0,
    };

    const displayValue = Math.floor((value2 * (max - min) + min) * 100) / 100;

    if (this.props.range) {
      return (
        <React.Fragment>
          <Bar transparent width={value2 - value1} />
          <Draggable axis="x" onDrag={this.handleDrag2} bounds={bounds2}>
            <Knob value={rangeSliderWidth}>
              <Value>{displayValue}</Value>
            </Knob>
          </Draggable>
          <Bar width={1 - value2} />
        </React.Fragment>
      );
    }
    return null;
  }

  render() {
    const {
      position1,
      position2,
      rangeSliderRef,
      rangeSliderWidth,
    } = this.state;
    const { min, max, range } = this.props;

    const value1 = rangeSliderWidth > 0 ? position1 / rangeSliderWidth : 0;
    const bounds1 = {
      left: 0,
      right: rangeSliderWidth + position2 - (range ? 16 : 0),
    };

    const displayValue = Math.floor((value1 * (max - min) + min) * 100) / 100;

    return (
      <BarWrapper ref={rangeSliderRef}>
        <Bar width={value1} />
        <Draggable axis="x" onDrag={this.handleDrag1} bounds={bounds1}>
          <Knob value={0}>
            <Value>{displayValue}</Value>
          </Knob>
        </Draggable>
        {this.renderSecondKnob()}
      </BarWrapper>
    );
  }
}

ValueSlider.defaultProps = {
  range: false,
};

ValueSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  range: PropTypes.bool,
};

export default ValueSlider;
