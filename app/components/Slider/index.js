/**
 *
 * Slider
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Knob from './Knob';
import SliderText from './SliderText';
import SliderWrapper from './SliderWrapper';

/* eslint-disable react/prefer-stateless-function */
class Slider extends React.Component {
  render() {
    return (
      <SliderWrapper>
        <Knob>
          <FontAwesomeIcon icon={faArrowRight} size="xs" />
        </Knob>
        <SliderText>WiFi</SliderText>
      </SliderWrapper>
    );
  }
}

Slider.propTypes = {};

export default Slider;
