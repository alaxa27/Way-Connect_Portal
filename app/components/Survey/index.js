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
    };

    this.changeCurrentQuestion = this.changeCurrentQuestion.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.validateAnswer = this.validateAnswer.bind(this);
  }

  componentDidMount() {
    const { question } = this.props.survey;
    this.changeCurrentQuestion(question);
  }

  changeCurrentQuestion(currentQuestion) {
    this.setState({ currentQuestion });
  }

  goToNextQuestion(answerList) {
    const { children } = this.state.currentQuestion;
    const answer = answerList[0];
    for (let i = 0; i < children.length; i += 1) {
      const { question } = children[i];
      if (question.parent_choices.includes(answer))
        this.changeCurrentQuestion(question);
    }
  }

  validateAnswer(answerList) {
    const { currentQuestion, surveyResult } = this.state;
    surveyResult.push({
      type: currentQuestion.type,
      id: currentQuestion.id,
      answer: answerList,
    });
    this.setState({ surveyResult });
    if (currentQuestion.children.length > 0) {
      this.goToNextQuestion(answerList);
    } else {
      this.props.onLastAnswer(surveyResult);
    }
  }

  render() {
    const { currentQuestion } = this.state;
    if (currentQuestion) {
      return (
        <SurveyWrapper>
          <TransitionGroup>
            <ModuleSlide key={currentQuestion.id} unmountOnExit mountEnter>
              <Question onValid={this.validateAnswer} {...currentQuestion} />
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
