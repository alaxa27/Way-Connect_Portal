/**
 *
 * QuestionValue
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import ValueSlider from 'components/ValueSlider';

/* eslint-disable react/prefer-stateless-function */
class QuestionValue extends React.Component {
  render() {
    return <ValueSlider min={0} max={10} />;
  }
}

QuestionValue.propTypes = {};

export default QuestionValue;
