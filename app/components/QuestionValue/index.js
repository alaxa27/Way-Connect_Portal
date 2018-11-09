/**
 *
 * QuestionValue
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import ValueSlider from 'components/ValueSlider';
import QuestionValueWrapper from './QuestionValueWrapper';

/* eslint-disable react/prefer-stateless-function */
class QuestionValue extends React.Component {
  render() {
    return (
      <QuestionValueWrapper>
        <ValueSlider {...this.props} />
      </QuestionValueWrapper>
    );
  }
}

QuestionValue.propTypes = {};

export default QuestionValue;
