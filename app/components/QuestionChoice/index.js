/**
 *
 * QuestionChoice
 *
 */

import React from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import QuestionChoiceWrapper from './QuestionChoiceWrapper';
import Choice from './Choice';
import ChoiceInput from './ChoiceInput';
import ChoiceLabel from './ChoiceLabel';

/* eslint-disable react/prefer-stateless-function */
class QuestionChoice extends React.Component {
  renderChoices(choices, multiple) {
    return _.map(choices, (choice, key) => (
      <Choice multiple={multiple} key={key}>
        <ChoiceInput multiple={multiple} />
        <ChoiceLabel>{choice.text}</ChoiceLabel>
      </Choice>
    ));
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
};

QuestionChoice.propTypes = {
  multiple: PropTypes.bool,
  choices: PropTypes.array.isRequired,
};

export default QuestionChoice;
