/**
 *
 * Question
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Title from 'components/Title';
import QuestionWrapper from './QuestionWrapper';
import QuestionText from './QuestionText';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Question extends React.Component {
  render() {
    return (
      <QuestionWrapper>
        <Title>Questionnaire</Title>
        <QuestionText>Quelle est la réponse 3 ?</QuestionText>
      </QuestionWrapper>
    );
  }
}

Question.propTypes = {};

export default Question;
