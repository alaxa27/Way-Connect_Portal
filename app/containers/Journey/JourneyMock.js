import React from 'react';
import PropTypes from 'prop-types';

import Communication from 'components/Communication';
import CustomerService from 'components/CustomerService';
import Footer from 'components/Footer';
import Question from 'components/Question';

import JourneyWrapper from './JourneyWrapper';
import JourneyItem from './JourneyItem';

const sampleData = {
  question: {
    choice_unique: {
      id: 2,
      type: 'CHOICE',
      text: 'Multiple foobarbaz ?????',
      multiple: false,
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
    choice_multiple: {
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
    value_single: {
      id: 4,
      type: 'VALUE',
      text: 'How much?',
      min: 0, // may be null
      max: 10, // may be null
      step: 1, // may be null
      defaultAnswers: [],
    },
    value_multiple: {
      id: 445,
      type: 'VALUE_RANGE',
      text: 'How much?',
      min: 1, // may be null
      max: 10, // may be null
      step: 0.1, // may be null
      defaultAnswers: [],
    },
  },
  communication: {
    no_contact: {
      name: 'Parfum Bleu',
      company_name: 'Channel',
      video: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
      phone_number: '',
    },
    contact: {
      video: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
      campaign: {
        name: 'Parfum Bleu',
        company_name: 'Channel',
      },
      redirection: {
        type: 'tel',
        target: '12345678',
      },
    },
  },
  customer_service: {
    phone: {
      establishment_name: '180° Cafe & Resto - Sousse',
      redirection: {
        type: 'tel',
      },
    },
  },
};

const renderJourneyItem = (type, sample) => {
  switch (type) {
    case 'communication':
      return (
        <Communication
          {...sampleData.communication[sample]}
          onProgress={() => {}}
          onRedirectionClick={() => {}}
          playing
        />
      );
    case 'customer_service':
      return <CustomerService {...sampleData.customer_service[sample]} />;
    case 'question':
      return <Question {...sampleData.question[sample]} />;
    default:
      return null;
  }
};

const JourneyMock = props => {
  const { type, sample } = props.match.params;
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
