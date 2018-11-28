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
    const establishmentPicture = 'bar';
    const expectedResult = state
      .set('establishmentName', establishmentName)
      .set('establishmentPicture', establishmentPicture);

    expect(
      loaderPageReducer(
        state,
        establishmentLoaded(establishmentName, establishmentPicture),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle the connectionPosted when there is a video', () => {
    const communication = fromJS({
      foo: 'bar',
      baz: 'foo',
    });

    const expectedResult = state.set('communication', communication);
    expect(
      loaderPageReducer(state, connectionPosted({ communication })),
    ).toEqual(expectedResult);
  });

  it('should handle the connectionPosted when there is no video', () => {
    const expectedResult = state.set('communication', null);
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

    const expectedResult = state
      .set('promotionLevels', fromJS(promotionLevelsObject))
      .set('bannerText', '')
      .set('claimPhoneNumber', '');

    expect(
      loaderPageReducer(state, promotionLevelsLoaded(promotionLevelsObject)),
    ).toEqual(expectedResult);
  });

  it('should handle the bannerText if promotionLevel has rank 101', () => {
    const bannerText = 'Banner placeholder';
    const promotionLevelsObject = [
      {
        rank: 1,
        required_views: 0,
        reward: '0',
        reward_currency: '',
        text: '',
      },
    ];

    const promotionLevelsServerResponse = [
      ...promotionLevelsObject,
      {
        rank: 101,
        required_views: 0,
        reward: '0',
        reward_currency: '',
        text: bannerText,
      },
    ];

    const expectedResult = state
      .set('promotionLevels', fromJS(promotionLevelsObject))
      .set('bannerText', bannerText)
      .set('claimPhoneNumber', '');

    expect(
      loaderPageReducer(
        state,
        promotionLevelsLoaded(promotionLevelsServerResponse),
      ),
    ).toEqual(expectedResult);
  });

  it('should get the claimPhoneNumber if promotionLevels has rank 102', () => {
    const claimPhoneNumber = '91823091';
    const promotionLevelsObject = [
      {
        rank: 1,
        required_views: 0,
        reward: '0',
        reward_currency: '',
        text: '',
      },
    ];

    const promotionLevelsServerResponse = [
      ...promotionLevelsObject,
      {
        rank: 102,
        required_views: 0,
        reward: '0',
        reward_currency: '',
        text: claimPhoneNumber,
      },
    ];

    const expectedResult = state
      .set('promotionLevels', fromJS(promotionLevelsObject))
      .set('claimPhoneNumber', claimPhoneNumber)
      .set('bannerText', '');

    expect(
      loaderPageReducer(
        state,
        promotionLevelsLoaded(promotionLevelsServerResponse),
      ),
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
