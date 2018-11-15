import { fromJS } from 'immutable';
import loaderPageReducer from '../reducer';

describe('loaderPageReducer', () => {
  it('returns the initial state', () => {
    expect(loaderPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
