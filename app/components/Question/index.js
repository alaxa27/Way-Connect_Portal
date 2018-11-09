/**
 *
 * Question
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Title from 'components/Title';
import QuestionChoice from 'components/QuestionChoice';
import QuestionValue from 'components/QuestionValue';
import QuestionWrapper from './QuestionWrapper';
import QuestionText from './QuestionText';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Question extends React.Component {
  renderQuestion(question) {
    switch (question.type) {
      case 'VALUE':
        return <QuestionValue {...question} />;
      case 'VALUE_RANGE':
        return <QuestionValue range {...question} />;
      case 'CHOICE':
        return <QuestionChoice {...question} />;
      default:
        return null;
    }
  }

  render() {
    const { text } = this.props;
    return (
      <QuestionWrapper>
        <Title>Questionnaire</Title>
        <QuestionText>{text}</QuestionText>
        {this.renderQuestion(this.props)}
      </QuestionWrapper>
    );
  }
}

Question.propTypes = {};

export default Question;
