import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loaderPage state domain
 */

const selectLoaderPageDomain = state => state.get('loaderPage', initialState);

/**
 * Other specific selectors
 */
const makeSelectMac = () =>
  createSelector(selectLoaderPageDomain, loaderState => loaderState.get('mac'));

const makeSelectEstablishmentName = () =>
  createSelector(selectLoaderPageDomain, loaderState =>
    loaderState.get('establishmentName'),
  );
/**
 * Default selector used by LoaderPage
 */

const makeSelectLoaderPage = () =>
  createSelector(selectLoaderPageDomain, substate => substate.toJS());

export default makeSelectLoaderPage;
export { selectLoaderPageDomain, makeSelectMac, makeSelectEstablishmentName };
