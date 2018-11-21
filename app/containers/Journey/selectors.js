import { createSelector } from 'reselect';
import _ from 'underscore';
import { selectLoaderPageDomain } from 'containers/LoaderPage/selectors';
import { initialState } from './reducer';

const establishmentsWithFidelity = [
  'esttes',
  'Cactus Cafe',
  '180',
  'High Square',
  'Wood and Hills',
  'Yucca',
];
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

const generateCommunication = communication => ({
  type: 'C',
  communication: { ...communication },
});

const generateFidelity = (discount, promotionLevels, establishmentName) => ({
  type: 'F',
  fidelity: {
    establishment_name: establishmentName,
    current_level: {
      rank: discount.promotion_level ? discount.promotion_level.rank : 1,
      current_views: discount.current_views,
    },
    discounts: _.map(promotionLevels, lvl => ({
      ...lvl,
      offer: lvl.text ? lvl.txt : `${lvl.reward} ${lvl.reward_currency}`,
    })),
  },
});

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

const makeSelectJourney = () =>
  createSelector(selectLoaderPageDomain, loaderState => {
    const establishmentName = loaderState.get('establishmentName');
    const communication = loaderState.get('communication');
    const discount = loaderState.get('discount');
    const promotionLevels = loaderState.get('promotionLevels');
    const journey = [];

    journey.push(
      generateQuestion(
        questionSamples[Math.floor(Math.random() * questionSamples.length)],
      ),
    );
    if (communication) {
      journey.push(generateCommunication(communication));
    }
    if (_.contains(establishmentsWithFidelity, establishmentName)) {
      journey.push(
        generateFidelity(discount, promotionLevels, establishmentName),
      );
    }
    return journey;
  });

export default makeSelectJourney;
export { selectJourneyDomain };
