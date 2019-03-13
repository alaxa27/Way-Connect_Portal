/**
 *
 * Survey
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
// import styled from 'styled-components';

import { ModuleSlide } from 'components/Animations';
import Question from 'components/Question';
import SurveyWrapper from './SurveyWrapper';

/* eslint-disable react/prefer-stateless-function */
class Survey extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      surveyResult: [],
      currentQuestion: {},
    };

    this.changeCurrentQuestion = this.changeCurrentQuestion.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.validateAnswer = this.validateAnswer.bind(this);
  }

  componentDidMount() {
    this.changeCurrentQuestion(this.props.survey);
  }

  changeCurrentQuestion(currentQuestion) {
    this.setState({ currentQuestion });
  }

  goToNextQuestion(answerList) {
    const { children } = this.state.currentQuestion;
    const answer = answerList[0];
    for (let i = 0; i < children.length; i += 1) {
      if (children[i].parent_choices.includes(answer)) {
        this.changeCurrentQuestion(children[i]);
        return true;
      }
    }
    return false;
  }

  validateAnswer(answerList) {
    const { currentQuestion, surveyResult } = this.state;
    surveyResult.push({
      type: currentQuestion.question.type,
      id: currentQuestion.question.id,
      answer: answerList,
    });
    this.setState({ surveyResult });
    if (currentQuestion.children.length > 0) {
      if (!this.goToNextQuestion(answerList))
        this.props.onLastAnswer(surveyResult);
    }
  }

  render() {
    const { question } = this.state.currentQuestion;
    if (question) {
      return (
        <SurveyWrapper>
          <TransitionGroup>
            <ModuleSlide key={question.id} unmountOnExit mountEnter>
              <Question
                key={question.id}
                onValid={this.validateAnswer}
                {...question}
              />
            </ModuleSlide>
          </TransitionGroup>
        </SurveyWrapper>
      );
    }
    return null;
  }
}

Survey.propTypes = {
  survey: PropTypes.shape({
    question: PropTypes.object,
  }),
  onLastAnswer: PropTypes.func,
};

export default Survey;
