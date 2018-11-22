import { fromJS, List } from 'immutable';
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
  it('should select the promotion levels', () => {
    const promotionLevels = List([1, 2, 3]);
    const mockedState = fromJS({
      loaderPage: {
        promotionLevels,
      },
    });
    expect(promotionLevelsSelector(mockedState)).toEqual(promotionLevels);
  });
});
