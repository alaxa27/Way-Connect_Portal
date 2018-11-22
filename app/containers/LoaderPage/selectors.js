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

const makeSelectVideoCommunication = () =>
  createSelector(selectLoaderPageDomain, loaderState =>
    loaderState.get('videoCommunication'),
  );

const makeSelectDiscount = () =>
  createSelector(selectLoaderPageDomain, loaderState =>
    loaderState.get('discount'),
  );

const makeSelectPromotionLevels = () =>
  createSelector(selectLoaderPageDomain, loaderState =>
    loaderState.get('promotionLevels'),
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
  makeSelectVideoCommunication,
  makeSelectDiscount,
  makeSelectPromotionLevels,
};
