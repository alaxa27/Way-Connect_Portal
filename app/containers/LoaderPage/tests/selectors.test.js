import { fromJS } from 'immutable';
import {
  selectLoaderPageDomain,
  makeSelectEstablishmentName,
  makeSelectVideoCommunication,
  makeSelectDiscount,
  makeSelectPromotionLevels,
} from '../selectors';

describe('selectLoaderPageDomain', () => {
  it('should select the loader page domain', () => {
    const loaderPageState = fromJS({
      data: {},
    });
    const mockedState = fromJS({
      loaderPage: loaderPageState,
    });
    expect(selectLoaderPageDomain(mockedState)).toEqual(loaderPageState);
  });
});

describe('makeSelectEstablishmentName', () => {
  const establishmentNameSelector = makeSelectEstablishmentName();
  it('should select the establishmentName', () => {
    const establishmentName = 'establishment1';
    const mockedState = fromJS({
      loaderPage: {
        establishmentName,
      },
    });
    expect(establishmentNameSelector(mockedState)).toEqual(establishmentName);
  });
});

describe('makeSelectVideoCommunication', () => {
  const videoCommunicationSelector = makeSelectVideoCommunication();
  it('should select the videoCommunication', () => {
    const videoCommunication = 'video-url';
    const mockedState = fromJS({
      loaderPage: {
        videoCommunication,
      },
    });
    expect(videoCommunicationSelector(mockedState)).toEqual(videoCommunication);
  });
});

describe('makeSelectDiscount', () => {
  const discountSelector = makeSelectDiscount();
  it('should select the discount', () => {
    const discount = fromJS({
      data: true,
    });
    const mockedState = fromJS({
      loaderPage: {
        discount,
      },
    });
    expect(discountSelector(mockedState)).toEqual(discount);
  });
});

describe('makeSelectPromotionLevels', () => {
  const promotionLevelsSelector = makeSelectPromotionLevels();
  it('should select the promotion levels and make the text as offer', () => {
    const promotionLevels = [
      {
        rank: 1,
        required_views: 0,
        reward: '',
        reward_currency: '',
        text: 'a',
      },
      {
        rank: 2,
        required_views: 0,
        reward: '',
        reward_currency: '',
        text: 'b',
      },
    ];

    const mockedState = fromJS({
      loaderPage: {
        promotionLevels,
      },
    });

    const expectedResponse = fromJS([
      {
        rank: 1,
        required_views: 0,
        reward: '',
        reward_currency: '',
        offer: 'a',
      },
      {
        rank: 2,
        required_views: 0,
        reward: '',
        reward_currency: '',
        offer: 'b',
      },
    ]);
    expect(promotionLevelsSelector(mockedState)).toEqual(expectedResponse);
  });
  it('should generate the offer based on reward if no text', () => {
    const promotionLevels = [
      {
        rank: 1,
        required_views: 0,
        reward: '1.00',
        reward_currency: 'EUR',
        text: '',
      },
      {
        rank: 2,
        required_views: 0,
        reward: '2.00',
        reward_currency: 'EUR',
        text: null,
      },
    ];

    const mockedState = fromJS({
      loaderPage: {
        promotionLevels,
      },
    });

    const expectedResponse = fromJS([
      {
        rank: 1,
        required_views: 0,
        reward: '1.00',
        reward_currency: 'EUR',
        offer: '1.00 EUR',
      },
      {
        rank: 2,
        required_views: 0,
        reward: '2.00',
        reward_currency: 'EUR',
        offer: '2.00 EUR',
      },
    ]);
    expect(promotionLevelsSelector(mockedState)).toEqual(expectedResponse);
  });
});
