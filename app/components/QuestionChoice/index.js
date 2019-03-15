/**
 *
 * QuestionChoice
 *
 */

import React from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FadeIn } from 'components/Animations';

import Choice from './Choice';
import ChoiceInput from './ChoiceInput';
import ChoiceLabel from './ChoiceLabel';
import QuestionChoiceWrapper from './QuestionChoiceWrapper';

/* eslint-disable react/prefer-stateless-function */
class QuestionChoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showIndex: -1,
    };

    this.initializeAnswers = this.initializeAnswers.bind(this);
    this.answer = this.answer.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.removeAnswer = this.removeAnswer.bind(this);
    this.isActive = this.isActive.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  componentDidMount() {
    this.initializeAnswers(this.props.defaultAnswers);
    this.showNextElement(500, this.props.choices.length);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.answers !== this.state.answers) {
      if (this.isValid()) {
        const { id } = this.props;
        this.props.onValid(this.state.answers, id);
      }
    }
  }

  initializeAnswers(answers) {
    this.setState({ answers });
  }

  removeAnswer(i) {
    this.setState(prevState => {
      const answers = [...prevState.answers];
      answers.splice(i, 1);
      return {
        answers,
      };
    });
  }

  addAnswer(id) {
    this.setState(prevState => ({
      answers: [...prevState.answers, id],
    }));
  }

  answer(id) {
    const { multiple } = this.props;
    const answerIndex = _.indexOf(this.state.answers, id);

    if (answerIndex === -1) {
      if (multiple) {
        this.addAnswer(id);
      } else {
        this.setState({
          answers: [id],
        });
      }
    } else if (multiple) {
      this.removeAnswer(answerIndex);
    }
  }

  isActive(id) {
    return _.contains(this.state.answers, id);
  }

  isValid() {
    if (this.state.answers.length > 0) {
      return true;
    }
    return false;
  }

  renderChoices(choices, multiple) {
    const { showIndex } = this.state;
    return _.map(choices, (choice, key) => {
      const active = this.isActive(choice.id);
      return (
        <FadeIn key={key} in={showIndex > key} timeout={100}>
          <Choice
            active={active}
            multiple={multiple}
            key={key}
            id={choice.id}
            onChoiceClick={this.answer}
          >
            <ChoiceInput active={active} multiple={multiple} />
            <ChoiceLabel active={active}>{choice.text}</ChoiceLabel>
          </Choice>
        </FadeIn>
      );
    });
  }

  showNextElement(timeout, numElements) {
    setTimeout(() => {
      this.setState(prevState => ({ showIndex: prevState.showIndex + 1 }));
      if (this.state.showIndex < numElements)
        this.showNextElement(timeout, numElements);
    }, timeout);
  }

  render() {
    const { multiple, choices } = this.props;

    return (
      <QuestionChoiceWrapper>
        {this.renderChoices(choices, multiple)}
      </QuestionChoiceWrapper>
    );
  }
}

QuestionChoice.defaultProps = {
  multiple: false,
  defaultAnswers: [],
};

QuestionChoice.propTypes = {
  id: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  defaultAnswers: PropTypes.array,
  choices: PropTypes.array.isRequired,
  onValid: PropTypes.func.isRequired,
};

export default QuestionChoice;
