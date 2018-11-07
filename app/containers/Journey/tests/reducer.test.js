import { fromJS } from 'immutable';
import journeyReducer from '../reducer';

describe('journeyReducer', () => {
  it('returns the initial state', () => {
    expect(journeyReducer(undefined, {})).toEqual(fromJS({}));
  });
});
