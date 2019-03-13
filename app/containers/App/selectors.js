import { createSelector } from 'reselect';

const selectRouter = state => state.get('router');

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

const makeSelectPrev = () => {
  const locationSelector = makeSelectLocation();
  return createSelector(
    locationSelector,
    location => (location.state ? location.state.prev : false),
  );
};

export { makeSelectLocation, makeSelectPrev };
