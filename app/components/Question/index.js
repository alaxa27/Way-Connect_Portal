/**
 *
 * Question
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Title from 'components/Title';
import SubTitle from 'components/SubTitle';
import QuestionChoice from 'components/QuestionChoice';
import QuestionValue from 'components/QuestionValue';
import QuestionWrapper from './QuestionWrapper';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Question extends React.Component {
  renderQuestion(question) {
    switch (question.type) {
      case 'VALUE':
        return <QuestionValue key={question.id} {...question} />;
      case 'VALUE_RANGE':
        return <QuestionValue key={question.id} range {...question} />;
      case 'CHOICE':
        return <QuestionChoice key={question.id} {...question} />;
      default:
        return null;
    }
  }

  render() {
    const { text } = this.props;
    return (
      <QuestionWrapper>
        <Title>Questionnaire</Title>
        <SubTitle>{text}</SubTitle>
        {this.renderQuestion(this.props)}
      </QuestionWrapper>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default Question;
