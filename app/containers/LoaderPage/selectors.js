import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loaderPage state domain
 */

const selectLoaderPageDomain = state => state.get('loaderPage', initialState);

/**
 * Other specific selectors
 */

const makeSelectEstablishmentName = () =>
  createSelector(selectLoaderPageDomain, loaderState =>
    loaderState.get('establishmentName'),
  );

const makeSelectConnection = () =>
  createSelector(selectLoaderPageDomain, loaderState =>
    loaderState.get('connection'),
  );

const makeSelectCurrentFidelityLevel = () =>
  createSelector(selectLoaderPageDomain, loaderState =>
    loaderState.get('currentFidelityLevel'),
  );

/**
 * Default selector used by LoaderPage
 */

const makeSelectLoaderPage = () =>
  createSelector(selectLoaderPageDomain, substate => substate.toJS());

export default makeSelectLoaderPage;
export {
  selectLoaderPageDomain,
  makeSelectEstablishmentName,
  makeSelectConnection,
  makeSelectCurrentFidelityLevel,
};
