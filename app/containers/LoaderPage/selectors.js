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

const makeSelectEstablishmentPicture = () =>
  createSelector(
    selectLoaderPageDomain,
    loaderState => loaderState.get('establishmentPicture') || null,
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
  createSelector(selectLoaderPageDomain, loaderState => {
    const promotionLevels = loaderState.get('promotionLevels');
    try {
      return promotionLevels.map(level => {
        if (level.get('text')) {
          return level.set('offer', level.get('text')).delete('text');
        }
        return level
          .set(
            'offer',
            `${level.get('reward')} ${level.get('reward_currency')}`,
          )
          .delete('text');
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  });

const makeSelectBannerText = () =>
  createSelector(selectLoaderPageDomain, loaderState => {
    const bannerText = loaderState.get('bannerText');
    return bannerText || null;
  });

const makeSelectClaimPhoneNumber = () =>
  createSelector(selectLoaderPageDomain, loaderState => {
    const claimPhoneNumber = loaderState.get('claimPhoneNumber');
    return claimPhoneNumber || null;
  });

/**
 * Default selector used by LoaderPage
 */

const makeSelectLoaderPage = () =>
  createSelector(selectLoaderPageDomain, substate => substate.toJS());

export default makeSelectLoaderPage;
export {
  selectLoaderPageDomain,
  makeSelectEstablishmentName,
  makeSelectEstablishmentPicture,
  makeSelectVideoCommunication,
  makeSelectDiscount,
  makeSelectPromotionLevels,
  makeSelectBannerText,
  makeSelectClaimPhoneNumber,
};
