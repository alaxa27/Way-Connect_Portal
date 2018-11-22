import { fromJS } from 'immutable';
import loaderPageReducer from '../reducer';
import {
  establishmentLoaded,
  connectionPosted,
  promotionLevelsLoaded,
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
    const videoURL = 'foobarbaz';
    const expectedResult = state.set('videoCommunication', videoURL);
    expect(
      loaderPageReducer(
        state,
        connectionPosted({ communication: { video: videoURL } }),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle the connectionPosted when there is no video', () => {
    const expectedResult = state.set('videoCommunication', '');
    expect(
      loaderPageReducer(state, connectionPosted({ communication: null })),
    ).toEqual(expectedResult);
  });

  it('should handle the promotionLevelsLoaded action properly', () => {
    const promotionLevelsObject = [
      {
        rank: 1,
        required_views: 0,
        reward: '0',
        reward_currency: '',
        text: '',
      },
      {
        rank: 2,
        required_views: 0,
        reward: '0',
        reward_currency: '',
        text: '',
      },
    ];

    const expectedResult = state.set(
      'promotionLevels',
      fromJS(promotionLevelsObject),
    );

    expect(
      loaderPageReducer(state, promotionLevelsLoaded(promotionLevelsObject)),
    ).toEqual(expectedResult);
  });

  it('should handle the discountLoaded action properly', () => {
    const expectedResult = state
      .setIn(['discount', 'current_views'], 1)
      .setIn(['discount', 'rank'], 1);

    expect(
      loaderPageReducer(
        state,
        discountLoaded({
          promotion_level: { rank: 1 },
          current_views: 1,
        }),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle the discountLoadingError action properly', () => {
    const expectedResult = state
      .setIn(['discount', 'current_views'], 1)
      .setIn(['discount', 'rank'], 1);

    expect(loaderPageReducer(state, discountLoadingError())).toEqual(
      expectedResult,
    );
  });
});
