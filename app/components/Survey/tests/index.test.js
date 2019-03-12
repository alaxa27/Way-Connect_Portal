import React from 'react';
import { shallow } from 'enzyme';
// import { enzymeFind } from 'styled-components/test-utils';

import Survey from '../index';

describe('<Survey />', () => {
  const initialProps = {
    survey: {
      question: {},
    },
  };
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<Survey {...initialProps} />);
    instance = wrapper.instance();
  });
  describe('goToNextQuestion', () => {
    const currentQuestion = {
      children: [
        {
          parent_choices: [1, 2],
        },
      ],
    };
    beforeEach(() => {
      wrapper.setState({ currentQuestion });
    });
    it('expect nothing to happen if the selected answer is not in the childrens parent_choices', () => {
      instance.goToNextQuestion([0]);

      expect(wrapper.state().currentQuestion).toEqual(currentQuestion);
    });
    it('expect to changeCurrentQuestion with the correct one', () => {
      instance.goToNextQuestion([1]);

      const expectedResponse = {
        parent_choices: [1, 2],
      };
      expect(wrapper.state().currentQuestion).toEqual(expectedResponse);
    });
  });

  describe('validateAnswer', () => {
    beforeEach(() => {
      instance.goToNextQuestion = jest.fn();
    });
    it('should call goToNextQuestion with the correct answerList if not on the last question', () => {
      const currentQuestion = {
        children: [0],
        question: {
          type: 'A',
          id: 'b',
        },
      };
      wrapper.setState({ currentQuestion });
      instance.validateAnswer([0]);

      const expectedResponse = [0];
      expect(instance.goToNextQuestion).toBeCalledWith(expectedResponse);
    });
    it('should call onLastAnswer method correctly when on the last question', () => {
      const onLastAnswerMock = jest.fn();
      wrapper.setProps({ onLastAnswer: onLastAnswerMock });
      const currentQuestion = {
        children: [],
        question: {
          type: 'A',
          id: 'b',
        },
      };
      wrapper.setState({ currentQuestion });
      instance.validateAnswer([0]);
      const expectedResponse = [
        {
          type: 'A',
          id: 'b',
          answer: [0],
        },
      ];
      expect(onLastAnswerMock).toBeCalledWith(expectedResponse);
    });
  });
});
