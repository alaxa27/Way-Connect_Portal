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

const calcValues = (position1, position2, rangeSliderWidth) => {
  const value1 = rangeSliderWidth > 0 ? position1 / rangeSliderWidth : 0;
  const value2 = (rangeSliderWidth + position2) / rangeSliderWidth;
  return { value1, value2 };
};

/* eslint-disable react/prefer-stateless-function */
class ValueSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rangeSliderRef: React.createRef(),
      rangeSliderWidth: 0,
      position1: 0,
      position2: 0,
      gridX: 0,
    };

    this.handleDrag1 = this.handleDrag1.bind(this);
    this.handleDrag2 = this.handleDrag2.bind(this);
    this.renderSecondKnob = this.renderSecondKnob.bind(this);
  }

  componentDidMount() {
    this.setState(prevState => {
      const rangeSliderWidth = prevState.rangeSliderRef.current.offsetWidth;
      let gridX = 0;
      if (rangeSliderWidth > 0) {
        const { step, min, max } = this.props;
        const range = max - min;
        gridX = (step * rangeSliderWidth) / range;
      }
      return { rangeSliderWidth, gridX };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.position1 !== this.state.position1 ||
      prevState.position2 !== this.state.position2
    ) {
      const { position1, position2, rangeSliderWidth } = this.state;
      const { value1, value2 } = calcValues(
        position1,
        position2,
        rangeSliderWidth,
      );
      this.props.onValid([value1, value2]);
    }
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
    const { position1, position2, rangeSliderWidth, gridX } = this.state;
    const { min, max } = this.props;

    const { value1, value2 } = calcValues(
      position1,
      position2,
      rangeSliderWidth,
    );

    const bounds2 = {
      left: position1 - rangeSliderWidth + 16,
      right: 0,
    };

    const displayValue = Math.floor((value2 * (max - min) + min) * 100) / 100;

    if (this.props.range) {
      return (
        <React.Fragment>
          <Bar transparent style={{ flexGrow: value2 - value1 }} />
          <Draggable
            axis="x"
            grid={[gridX, 0]}
            onDrag={this.handleDrag2}
            bounds={bounds2}
          >
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
      gridX,
    } = this.state;
    const { min, max, range } = this.props;

    const { value1 } = calcValues(position1, position2, rangeSliderWidth);
    const bounds1 = {
      left: 0,
      right: rangeSliderWidth + position2 - (range ? 16 : 0),
    };

    const displayValue = Math.round((value1 * (max - min) + min) * 100) / 100;

    return (
      <BarWrapper ref={rangeSliderRef}>
        <Bar style={{ flexGrow: value1 }} />
        <Draggable
          axis="x"
          grid={[gridX, 0]}
          onDrag={this.handleDrag1}
          bounds={bounds1}
        >
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
  step: 1,
  onValid: () => {},
};

ValueSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  range: PropTypes.bool,
  onValid: PropTypes.func,
};

export default ValueSlider;
