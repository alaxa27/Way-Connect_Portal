import { createSelector } from 'reselect';
import { initialState } from './reducer';

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
  createSelector(selectJourneyDomain, substate => substate.toJS());

export default makeSelectJourney;
export { selectJourneyDomain };
