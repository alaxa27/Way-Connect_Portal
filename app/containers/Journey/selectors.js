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
      const journey = connection.map(item => {
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
          default:
            return null;
        }
      });

      return journey;
    },
  );
};

export default makeSelectJourney;
export { selectJourneyDomain };
