import React from 'react';
import PropTypes from 'prop-types';

import JourneyWrapper from 'containers/Journey/JourneyWrapper';
import JourneyItem from 'containers/Journey/JourneyItem';

import Communication from 'components/Communication';
import CustomerService from 'components/CustomerService';
import Footer from 'components/Footer';
import Question from 'components/Question';

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
    video_no_contact: {
      type: 'VIDEO',
      campaign: {
        name: 'Parfum Bleu',
        company_name: 'Channel',
      },
      video: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
      phone_number: '',
    },
    video_contact: {
      type: 'VIDEO',
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
    survey_no_contact: {
      type: 'SURVEY',
      campaign: {
        name: 'Parfum Bleu',
        company_name: 'Channel',
      },
      survey: {
        question: {
          id: '319ba2d67eb3484c86a2ddb977c3c2b8',
          type: 'CHOICE',
          text: 'What is your gender?',
          choices: [{ id: 1, text: 'Male' }, { id: 2, text: 'Female' }],
          parent_choices: [],
          children: [
            {
              question: {
                id: '84ab0cb60d7e47fab16fe28f53e3d149',
                type: 'CHOICE',
                text: 'What is your favorite color?',
                choices: [
                  { id: 3, text: 'Red' },
                  { id: 4, text: 'Blue' },
                  { id: 5, text: 'Green' },
                ],
                parent_choices: [1], // question only aimed at males
                children: [
                  {
                    question: {
                      id: 'd685096836104dabab9e796c1e5823af',
                      type: 'CHOICE',
                      text: "Don't you like red?",
                      choices: [
                        { id: 6, text: 'Yes I do' },
                        { id: 7, text: 'No' },
                      ],
                      // question only aimed at males whose favorite color is either blue or green
                      parent_choices: [4, 5],
                      children: [], // this was the last question
                    },
                  },
                ],
              },
            },
            {
              question: {
                id: '2b375b4cc4a54ca78af6ac8709396449',
                type: 'CHOICE',
                text: 'Are you a student?',
                choices: [{ id: 8, text: 'Yes' }, { id: 9, text: 'No' }],
                parent_choices: [2], // question only aimed at females
                children: [
                  {
                    question: {
                      id: '1b0a900a77e64efaa44bbeac4aa2311a',
                      type: 'CHOICE',
                      text: 'which school are you studying at?',
                      choices: [
                        { id: 10, text: 'Harvard' },
                        { id: 11, text: 'MIT' },
                        { id: 12, text: 'Stanford' },
                      ],
                      parent_choices: [8], // question only aimed at female students
                      children: [], // this was the last question
                    },
                  },
                ],
              },
            },
          ],
        },
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

const JourneyMocks = props => {
  const { type, sample } = props.match.params;
  return (
    <JourneyWrapper>
      <JourneyItem>{renderJourneyItem(type, sample)}</JourneyItem>
      <Footer index={1} number={4} countDown={0} />
    </JourneyWrapper>
  );
};

JourneyMocks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};

export default JourneyMocks;
