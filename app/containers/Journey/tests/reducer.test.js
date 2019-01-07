import { fromJS } from 'immutable';
import journeyReducer from '../reducer';
import {
  changeID,
  changeCurrentJourneyItem,
  changeDefaultAnswersList,
  changeWatchedSeconds,
} from '../actions';

describe('journeyReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      defaultAnswersList: {},
      previousID: -2,
      currentID: -1,
      currentJourneyItem: {},
      watchedSeconds: 0,
    });
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(journeyReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle changeID action properly', () => {
    const expectedResult = state.set('currentID', 32).set('previousID', 23);

    expect(
      journeyReducer(
        state.set('currentID', 23).set('previousID', 12),
        changeID(32),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle changeCurrentJourneyItem properly', () => {
    const expectedResult = state.set('currentJourneyItem', { a: 4 });

    expect(journeyReducer(state, changeCurrentJourneyItem({ a: 4 }))).toEqual(
      expectedResult,
    );
  });

  it('should handle the changeDefaultAnswersList if the questionID is already present', () => {
    const expectedResult = state.set(
      'defaultAnswersList',
      fromJS({ a2a: [1, 3] }),
    );
    expect(
      journeyReducer(
        state.set('defaultAnswersList', fromJS({ a2a: [1, 2] })),
        changeDefaultAnswersList([1, 3], 'a2a'),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle the changeDefaultAnswersList if the questionID is not already present', () => {
    const expectedResult = state.set(
      'defaultAnswersList',
      fromJS({ a2a: [1, 2] }),
    );
    expect(
      journeyReducer(state, changeDefaultAnswersList([1, 2], 'a2a')),
    ).toEqual(expectedResult);
  });

  it('should handle the changeWatchedSeconds action properly', () => {
    const expectedResult = state.set('watchedSeconds', 3);

    expect(journeyReducer(state, changeWatchedSeconds(3))).toEqual(
      expectedResult,
    );
  });
});
