import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import {
  makeSelectEstablishmentName,
  makeSelectConnection,
  makeSelectCurrentFidelityLevel,
} from 'containers/LoaderPage/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the journey state domain
 */

const selectJourneyDomain = state => state.get('journey', initialState);

/**
 * Other specific selectors
 */
const makeSelectDefaultAnswersList = () =>
  createSelector(selectJourneyDomain, journeyState =>
    journeyState.get('defaultAnswersList'),
  );

const makeSelectJourneySize = () => {
  const journeySelector = makeSelectJourney();
  return createSelector(journeySelector, journey => journey.size);
};

const makeSelectPreviousID = () =>
  createSelector(selectJourneyDomain, journeyState =>
    journeyState.get('previousID'),
  );

const makeSelectCurrentID = () =>
  createSelector(selectJourneyDomain, journeyState =>
    journeyState.get('currentID'),
  );

const makeSelectJourneyItem = id => {
  const journeySelector = makeSelectJourney();
  return createSelector(journeySelector, journey => {
    if (id < 0 || id > journey.size) {
      return fromJS({ type: 'OUT_OF_RANGE' });
    }
    if (id === journey.size) {
      return fromJS({ type: 'END' });
    }
    return journey.get(id);
  });
};

const makeSelectCurrentJourneyItem = () =>
  createSelector(selectJourneyDomain, journeyState =>
    journeyState.get('currentJourneyItem'),
  );

const makeSelectCustomerService = (establishmentName, customerService) =>
  createSelector(() => {
    const target = customerService.get('phone_number');
    return fromJS({
      establishment_name: establishmentName,
      redirection: {
        type: 'tel',
        target,
      },
    });
  });

const makeSelectRedirection = communication =>
  createSelector(() => {
    const redirection = communication.get('redirection');

    if (redirection) {
      const redirectionArray = redirection.split(';');
      if (redirectionArray.length === 2) {
        const result = fromJS({
          type: redirectionArray[0],
          target: redirectionArray[1],
        });
        if (result.get('type') === 'tel') {
          return result.set('target', `tel:${result.get('target')}`);
        }
        return result;
      }
    }
    return fromJS({
      type: null,
      target: null,
    });
  });

const makeSelectSurveyResult = () =>
  createSelector(selectJourneyDomain, journeyState =>
    journeyState.get('surveyResult'),
  );

const makeSelectWatchedSeconds = () =>
  createSelector(selectJourneyDomain, journeyState =>
    journeyState.get('watchedSeconds'),
  );
/**
 * Default selector used by Journey
 */

const makeSelectJourney = () => {
  const connectionSelector = makeSelectConnection();
  const establishmentNameSelector = makeSelectEstablishmentName();
  const currentFidelityLevelSelector = makeSelectCurrentFidelityLevel();
  const defaultAnswersListSelector = makeSelectDefaultAnswersList();
  return createSelector(
    connectionSelector,
    establishmentNameSelector,
    currentFidelityLevelSelector,
    defaultAnswersListSelector,
    (
      connection,
      establishmentName,
      currentFidelityLevel,
      defaultAnswersList,
    ) => {
      const journey = connection.get('journey').map(item => {
        switch (item.get('type')) {
          case 'F':
            return item
              .setIn(['fidelity', 'current_level'], currentFidelityLevel)
              .setIn(['fidelity', 'establishment_name'], establishmentName);
          case 'Q':
            // eslint-disable-next-line no-case-declarations
            const id = item.getIn(['question', 'id']);
            return item.setIn(
              ['question', 'defaultAnswers'],
              defaultAnswersList.has(id)
                ? defaultAnswersList.get(id)
                : fromJS([]),
            );
          case 'C':
            // eslint-disable-next-line no-case-declarations
            const redirectionSelector = makeSelectRedirection(
              item.get('communication'),
            );
            return item.setIn(
              ['communication', 'redirection'],
              redirectionSelector(),
            );
          case 'S':
            // eslint-disable-next-line no-case-declarations
            const customerServiceSelector = makeSelectCustomerService(
              establishmentName,
              item.get('customer_service'),
            );
            return item.set('customer_service', customerServiceSelector());
          default:
            return item;
        }
      });

      return journey;
    },
  );
};

export default makeSelectJourney;
export {
  selectJourneyDomain,
  makeSelectJourneySize,
  makeSelectCurrentJourneyItem,
  makeSelectCustomerService,
  makeSelectJourneyItem,
  makeSelectCurrentID,
  makeSelectPreviousID,
  makeSelectRedirection,
  makeSelectSurveyResult,
  makeSelectWatchedSeconds,
};
