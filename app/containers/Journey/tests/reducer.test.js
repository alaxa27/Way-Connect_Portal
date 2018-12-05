import { fromJS } from 'immutable';
import journeyReducer from '../reducer';
import { changeID, changeDefaultAnswersList } from '../actions';

describe('journeyReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      defaultAnswersList: {},
      currentID: -1,
    });
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(journeyReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle changeID action properly', () => {
    const expectedResult = state.set('currentID', 1);

    expect(journeyReducer(state, changeID(-1, 1, 3))).toEqual(expectedResult);
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
});
