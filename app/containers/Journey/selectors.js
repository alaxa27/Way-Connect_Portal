import { createSelector } from 'reselect';
import { fromJS, List } from 'immutable';
import {
  makeSelectEstablishmentName,
  makeSelectEstablishmentPicture,
  makeSelectVideoCommunication,
  makeSelectDiscount,
  makeSelectPromotionLevels,
  makeSelectBannerText,
  makeSelectClaimPhoneNumber,
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
  return createSelector(videoCommunicationSelector, communication => {
    if (!communication) return null;
    return fromJS({
      type: 'C',
      communication,
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
      try {
        if (promotionLevels.get(0).get('rank') === 100) return null;
        return fromJS({
          type: 'F',
          fidelity: {
            establishment_name: establishmentName,
            current_level: discount,
            discounts: promotionLevels,
          },
        });
      } catch (err) {
        console.error(err);
        return null;
      }
    },
  );
};

const makeSelectBanner = () => {
  const establishmentPictureSelector = makeSelectEstablishmentPicture();
  const bannerTextSelector = makeSelectBannerText();
  return createSelector(
    establishmentPictureSelector,
    bannerTextSelector,
    (picture, text) => {
      if (picture && text) {
        return fromJS({
          type: 'B',
          banner: {
            text,
            picture,
          },
        });
      }
      return null;
    },
  );
};

const makeSelectCustomerService = () => {
  const claimPhoneNumberSelector = makeSelectClaimPhoneNumber();
  return createSelector(claimPhoneNumberSelector, claimPhoneNumber => {
    if (claimPhoneNumber) {
      return fromJS({
        type: 'S',
        customer_service: {
          phone_number: claimPhoneNumber,
        },
      });
    }
    return null;
  });
};

const makeSelectJourney = () => {
  const fidelitySelector = makeSelectFidelity();
  const communicationSelector = makeSelectCommunication();
  const customerServiceSelector = makeSelectCustomerService();
  const bannerSelector = makeSelectBanner();
  return createSelector(
    communicationSelector,
    fidelitySelector,
    customerServiceSelector,
    bannerSelector,
    (communication, fidelity, customerService, banner) => {
      let journey = List([]);
      if (false) {
        return fromJS([
          {
            type: 'C',
            communication: {
              video: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
              phone_number: '+21678546320',
            },
          },
          {
            type: 'S',
            customer_service: {
              phone_number: '+21687234543',
            },
          },
        ]);
      }
      const question = generateQuestion(
        questionSamples[Math.floor(Math.random() * questionSamples.length)],
      );

      journey = journey.push(question);
      if (communication) journey = journey.push(communication);
      if (fidelity) journey = journey.push(fidelity);
      if (customerService) journey = journey.push(customerService);
      if (banner) journey = journey.push(banner);
      return journey;
    },
  );
};

export default makeSelectJourney;
export {
  selectJourneyDomain,
  makeSelectCommunication,
  makeSelectFidelity,
  makeSelectBanner,
  makeSelectCustomerService,
};
