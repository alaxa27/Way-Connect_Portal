import { createSelector } from 'reselect';
import { fromJS, List } from 'immutable';
import {
  makeSelectVideoCommunication,
  makeSelectDiscount,
  makeSelectPromotionLevels,
  makeSelectEstablishmentName,
} from 'containers/LoaderPage/selectors';
import { initialState } from './reducer';

const questionSamples = [
  {
    type: 'Q',
    question: {
      id: 32,
      type: 'CHOICE',
      text: 'Quel est votre sport préféré ?',
      multiple: false,
      choices: [
        {
          id: 1,
          text: 'Football',
        },
        {
          id: 2,
          text: 'Basketball',
        },
        {
          id: 3,
          text: 'Handball',
        },
      ],
      defaultAnswers: [],
    },
  },
  {
    type: 'Q',
    question: {
      id: 2,
      type: 'CHOICE',
      text: 'Vos types détablissements préférés ?',
      multiple: true,
      choices: [
        {
          id: 1,
          text: 'Bar',
        },
        {
          id: 2,
          text: 'Restaurant',
        },
        {
          id: 3,
          text: 'Hôtel',
        },
      ],
      defaultAnswers: [],
    },
  },
  {
    type: 'Q',
    question: {
      id: 4,
      type: 'VALUE',
      text: 'Quel note donneriez vous à cet établissement?',
      min: 0, // may be null
      max: 10, // may be null
      step: 1, // may be null
      defaultAnswers: [],
    },
  },
];
const generateQuestion = question => question;

/**
 * Direct selector to the journey state domain
 */

const selectJourneyDomain = state => state.get('journey', initialState);

/**
 * Other specific selectors
 */
/**
 * Default selector used by Journey
 */

const makeSelectCommunication = () => {
  const videoCommunicationSelector = makeSelectVideoCommunication();
  return createSelector(videoCommunicationSelector, communicationVideo => {
    if (!communicationVideo) return null;
    return fromJS({
      type: 'C',
      communication: {
        video: communicationVideo,
      },
    });
  });
};

const makeSelectFidelity = () => {
  const discountSelector = makeSelectDiscount();
  const promotionLevelsSelector = makeSelectPromotionLevels();
  const establishmentNameSelector = makeSelectEstablishmentName();
  return createSelector(
    discountSelector,
    promotionLevelsSelector,
    establishmentNameSelector,
    (discount, promotionLevels, establishmentName) => {
      if (promotionLevels.get(0).get('rank') === 100) return null;
      return fromJS({
        type: 'F',
        fidelity: {
          establishment_name: establishmentName,
          current_level: discount,
          discounts: promotionLevels,
        },
      });
    },
  );
};

const makeSelectJourney = () => {
  const fidelitySelector = makeSelectFidelity();
  const communicationSelector = makeSelectCommunication();
  return createSelector(
    communicationSelector,
    fidelitySelector,
    (communication, fidelity) => {
      let journey = List([]);
      const question = generateQuestion(
        questionSamples[Math.floor(Math.random() * questionSamples.length)],
      );

      journey = journey.push(question);
      if (communication) journey = journey.push(communication);
      if (fidelity) journey = journey.push(fidelity);
      return journey;
    },
  );
};

export default makeSelectJourney;
export { selectJourneyDomain, makeSelectCommunication, makeSelectFidelity };
