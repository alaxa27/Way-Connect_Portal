/**
 *
 * QuestionChoice
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import QuestionChoiceWrapper from './QuestionChoiceWrapper';
import Choice from './Choice';
import ChoiceInput from './ChoiceInput';
import ChoiceLabel from './ChoiceLabel';

/* eslint-disable react/prefer-stateless-function */
class QuestionChoice extends React.Component {
  render() {
    return (
      <QuestionChoiceWrapper>
        <Choice active>
          <ChoiceInput unique active />
          <ChoiceLabel active>Female</ChoiceLabel>
        </Choice>
        <Choice>
          <ChoiceInput unique />
          <ChoiceLabel>Male</ChoiceLabel>
        </Choice>
        <Choice>
          <ChoiceInput unique />
          <ChoiceLabel>Unknown</ChoiceLabel>
        </Choice>
        <Choice active>
          <ChoiceInput active />
          <ChoiceLabel active>Female</ChoiceLabel>
        </Choice>
        <Choice>
          <ChoiceInput />
          <ChoiceLabel>Male</ChoiceLabel>
        </Choice>
        <Choice>
          <ChoiceInput />
          <ChoiceLabel>Unknown</ChoiceLabel>
        </Choice>
      </QuestionChoiceWrapper>
    );
  }
}

QuestionChoice.propTypes = {};

export default QuestionChoice;
