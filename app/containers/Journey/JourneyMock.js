import React from 'react';
import PropTypes from 'prop-types';

import Footer from 'components/Footer';
import Question from 'components/Question';

import JourneyWrapper from './JourneyWrapper';
import JourneyItem from './JourneyItem';

const sampleData = {
  question: {
    multiple: {
      id: 2,
      type: 'CHOICE',
      text: 'Multiple foobarbaz ?????',
      multiple: true,
      choices: [
        {
          id: 1,
          text: 'foo',
        },
        {
          id: 2,
          text: 'bar',
        },
        {
          id: 3,
          text: 'baz',
        },
      ],
      defaultAnswers: [],
    },
  },
};

const renderJourneyItem = (type, sample) => {
  switch (type) {
    case 'question':
      return <Question onValid={() => {}} {...sampleData.question[sample]} />;
    default:
      return null;
  }
};

const JourneyMock = props => {
  const { type, sample } = props.match.params;
  console.log('Displaying: ', type, sample);
  return (
    <JourneyWrapper>
      <JourneyItem>{renderJourneyItem(type, sample)}</JourneyItem>
      <Footer index={1} number={4} countDown={0} />
    </JourneyWrapper>
  );
};

JourneyMock.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};

export default JourneyMock;
