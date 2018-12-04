import { fromJS } from 'immutable';
import loaderPageReducer from '../reducer';
import {
  establishmentLoaded,
  connectionPosted,
  discountLoaded,
  discountLoadingError,
} from '../actions';

describe('loaderPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      establishmentName: '',
    });
  });

  it('should returns the initial state', () => {
    const expectedResult = state;
    expect(loaderPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the establishmentLoaded action properly', () => {
    const establishmentName = 'foo';
    const expectedResult = state.set('establishmentName', establishmentName);

    expect(
      loaderPageReducer(state, establishmentLoaded(establishmentName)),
    ).toEqual(expectedResult);
  });

  it('should handle the connectionPosted when there is a video', () => {
    const connection = [
      {
        type: 'F',
        fidelity: {
          foo: 'bar',
        },
      },
    ];

    const expectedResult = state.set('connection', fromJS(connection));
    expect(loaderPageReducer(state, connectionPosted(connection))).toEqual(
      expectedResult,
    );
  });

  it('should handle the discountLoaded action properly', () => {
    const expectedResult = state
      .setIn(['currentFidelityLevel', 'current_views'], 2)
      .setIn(['currentFidelityLevel', 'current_rank'], 5);

    expect(
      loaderPageReducer(
        state,
        discountLoaded({
          current_rank: 5,
          current_views: 2,
        }),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle the discountLoadingError action properly', () => {
    const expectedResult = state
      .setIn(['currentFidelityLevel', 'current_views'], 1)
      .setIn(['currentFidelityLevel', 'current_rank'], 1);

    expect(loaderPageReducer(state, discountLoadingError())).toEqual(
      expectedResult,
    );
  });
});
