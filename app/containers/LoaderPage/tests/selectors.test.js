import { fromJS } from 'immutable';
import {
  selectLoaderPageDomain,
  makeSelectEstablishmentName,
  makeSelectEstablishmentPicture,
  makeSelectVideoCommunication,
  makeSelectDiscount,
  makeSelectPromotionLevels,
  makeSelectBannerText,
  makeSelectClaimPhoneNumber,
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

describe('makeSelectEstablishmentPicture', () => {
  const establishmentPictureSelector = makeSelectEstablishmentPicture();
  it('should select the establishmentPicture', () => {
    const establishmentPicture = 'picutreMOCK';

    const mockedState = fromJS({
      loaderPage: {
        establishmentPicture,
      },
    });
    expect(establishmentPictureSelector(mockedState)).toEqual(
      establishmentPicture,
    );
  });

  it('should return null if no establishmentPicture', () => {
    const mockedState = fromJS({
      loaderPage: {},
    });
    expect(establishmentPictureSelector(mockedState)).toEqual(null);
  });
});

describe('makeSelectVideoCommunication', () => {
  const videoCommunicationSelector = makeSelectVideoCommunication();
  it('should select the videoCommunication', () => {
    const videoURL = 'OIUOI';
    const phoneNumber = '09218309213';
    const communication = fromJS({
      video: videoURL,
      redirection: phoneNumber,
    });
    const mockedState = fromJS({
      loaderPage: {
        communication,
      },
    });
    const expectedResponse = fromJS({
      video: videoURL,
      phone_number: phoneNumber,
    });
    expect(videoCommunicationSelector(mockedState)).toEqual(expectedResponse);
  });

  it('should return null if the videoCommunication is null', () => {
    const mockedState = fromJS({
      loaderPage: {
        communication: null,
      },
    });
    const expectedResponse = null;
    expect(videoCommunicationSelector(mockedState)).toEqual(expectedResponse);
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

describe('makeSelectBannerText', () => {
  const bannerTextSelector = makeSelectBannerText();
  it('should select the bannerText', () => {
    const bannerText = 'BANNER';

    const mockedState = fromJS({
      loaderPage: {
        bannerText,
      },
    });
    expect(bannerTextSelector(mockedState)).toEqual(bannerText);
  });

  it('should return null if there is no bannerText', () => {
    const mockedState = fromJS({
      loaderPage: {},
    });
    expect(bannerTextSelector(mockedState)).toEqual(null);
  });
});

describe('makeSelectClaimPhoneNumber', () => {
  const claimPhoneNumberSelector = makeSelectClaimPhoneNumber();
  it('should select the claimPhoneNumber', () => {
    const claimPhoneNumber = '01120938109';

    const mockedState = fromJS({
      loaderPage: {
        claimPhoneNumber,
      },
    });
    expect(claimPhoneNumberSelector(mockedState)).toEqual(claimPhoneNumber);
  });

  it('should return null if no claimPhoneNumber', () => {
    const mockedState = fromJS({
      loaderPage: {},
    });

    expect(claimPhoneNumberSelector(mockedState)).toEqual(null);
  });
});
