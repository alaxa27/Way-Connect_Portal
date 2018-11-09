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
  constructor(props) {
    super(props);

    this.state = {
      choices: [],
    };

    this.choose = this.choose.bind(this);
    this.addChoice = this.addChoice.bind(this);
    this.removeChoice = this.removeChoice.bind(this);
    this.isActive = this.isActive.bind(this);
  }

  removeChoice(i) {
    this.setState(prevProps => {
      const choices = [...prevProps.choices];
      choices.splice(i, 1);
      return {
        choices,
      };
    });
  }

  addChoice(id) {
    this.setState(prevProps => ({
      choices: [...prevProps.choices, id],
    }));
  }

  choose(id) {
    const { multiple } = this.props;
    const choiceIndex = _.indexOf(this.state.choices, id);

    if (choiceIndex === -1) {
      if (multiple) {
        this.addChoice(id);
      } else {
        this.setState({
          choices: [id],
        });
      }
    } else if (multiple) {
      this.removeChoice(choiceIndex);
    }
  }

  isActive(id) {
    return _.contains(this.state.choices, id);
  }

  renderChoices(choices, multiple) {
    return _.map(choices, (choice, key) => {
      const active = this.isActive(choice.id);
      return (
        <Choice
          active={active}
          multiple={multiple}
          key={key}
          id={choice.id}
          onChoiceClick={this.choose}
        >
          <ChoiceInput active={active} multiple={multiple} />
          <ChoiceLabel>{choice.text}</ChoiceLabel>
        </Choice>
      );
    });
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
