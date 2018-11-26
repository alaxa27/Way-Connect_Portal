import { fromJS, List } from 'immutable';
import makeSelectJourney, {
  selectJourneyDomain,
  makeSelectCommunication,
  makeSelectFidelity,
  makeSelectBanner,
  makeSelectCustomerService,
} from '../selectors';

describe('selectJourneyDomain', () => {
  it('sould select the journey domain', () => {
    const journeyState = fromJS({
      data: {},
    });
    const mockedState = fromJS({
      journey: journeyState,
    });
    expect(selectJourneyDomain(mockedState)).toEqual(journeyState);
  });
});

describe('makeSelectCommunication', () => {
  const communicationSelector = makeSelectCommunication();
  it('sould select the communication if it exists', () => {
    const communication = fromJS({
      video: 'fezlkjjl',
      redirection: '098312',
    });
    const mockedState = fromJS({
      loaderPage: {
        communication,
      },
    });
    const expectedResponse = fromJS({
      type: 'C',
      communication: {
        video: communication.get('video'),
        phone_number: communication.get('redirection'),
      },
    });
    expect(communicationSelector(mockedState)).toEqual(expectedResponse);
  });

  it('sould return null if no communication', () => {
    const communication = null;
    const mockedState = fromJS({
      loaderPage: {
        communication,
      },
    });
    const expectedResponse = null;
    expect(communicationSelector(mockedState)).toEqual(expectedResponse);
  });
});

describe('makeSelectFidelity', () => {
  const fidelitySelector = makeSelectFidelity();
  const discount = fromJS({
    rank: 1,
    current_views: 3,
  });
  const establishmentName = 'testName';

  it('should select the fidelity if it is in the establishment', () => {
    const promotionLevels = fromJS([
      {
        rank: 1, // Already completed level
        reward: '1.00',
        reward_currency: 'EUR',
        text: 'foo',
        required_views: 1,
      },
      {
        rank: 2, // Already completed level
        reward: '2.00',
        reward_currency: 'EUR',
        text: 'bar',
        required_views: 2,
      },
    ]);

    const mockedState = fromJS({
      loaderPage: {
        discount,
        promotionLevels,
        establishmentName,
      },
    });

    const expectedPromotionLevels = fromJS([
      {
        rank: 1, // Already completed level
        reward: '1.00',
        reward_currency: 'EUR',
        offer: 'foo',
        required_views: 1,
      },
      {
        rank: 2, // Already completed level
        reward: '2.00',
        reward_currency: 'EUR',
        offer: 'bar',
        required_views: 2,
      },
    ]);
    const expectedResponse = fromJS({
      type: 'F',
      fidelity: {
        establishment_name: establishmentName,
        current_level: discount,
        discounts: expectedPromotionLevels,
      },
    });
    expect(fidelitySelector(mockedState)).toEqual(expectedResponse);
  });

  it('should return null if the fidelity is not establishment', () => {
    const promotionLevels = fromJS([
      {
        rank: 100, // Already completed level
        reward: '15.00',
        reward_currency: 'EUR',
        text: 'Coffee',
        required_views: 2,
      },
    ]);
    const mockedState = fromJS({
      loaderPage: {
        discount,
        promotionLevels,
        establishmentName,
      },
    });
    const expectedResponse = null;
    expect(fidelitySelector(mockedState)).toEqual(expectedResponse);
  });
});

describe('makeSelectBanner', () => {
  const bannerSelector = makeSelectBanner();
  it('should return null if bannerText is null', () => {
    const mockedState = fromJS({
      loaderPage: {
        establishmentPicture: 'fooo',
      },
    });

    const expectedResponse = null;
    expect(bannerSelector(mockedState)).toEqual(expectedResponse);
  });

  it('should return null if establishmentPicture is null', () => {
    const mockedState = fromJS({
      loaderPage: {
        bannerText: 'baaaar',
      },
    });

    const expectedResponse = null;
    expect(bannerSelector(mockedState)).toEqual(expectedResponse);
  });

  it('should generate a banner if bannerText && establishmentPicture', () => {
    const bannerText = 'foooo';
    const establishmentPicture = 'baaaar';
    const mockedState = fromJS({
      loaderPage: {
        establishmentPicture,
        bannerText,
      },
    });
    const expectedResponse = fromJS({
      type: 'B',
      banner: {
        text: bannerText,
        picture: establishmentPicture,
      },
    });
    expect(bannerSelector(mockedState)).toEqual(expectedResponse);
  });
});

describe('makeSelectCustomerService', () => {
  const customerServiceSelector = makeSelectCustomerService();
  it('should return null if claimPhoneNumber is null', () => {
    const mockedState = fromJS({
      loaderPage: {
        claimPhoneNumber: '',
      },
    });

    const expectedResponse = null;
    expect(customerServiceSelector(mockedState)).toEqual(expectedResponse);
  });

  it('should return the claim object if claimPhoneNumber', () => {
    const claimPhoneNumber = '2345789';
    const mockedState = fromJS({
      loaderPage: {
        claimPhoneNumber,
      },
    });

    const expectedResponse = fromJS({
      type: 'S',
      customer_service: {
        phone_number: claimPhoneNumber,
      },
    });
    expect(customerServiceSelector(mockedState)).toEqual(expectedResponse);
  });
});

describe('makeSelectJourney', () => {
  const journeySelector = makeSelectJourney();

  const communication = fromJS({
    video: 'OLKJEAF',
    phone_number: '12098302193',
  });
  const discount = fromJS({
    rank: 1,
    current_views: 3,
  });
  const establishmentName = 'testName';
  const promotionLevels = fromJS([
    {
      rank: 1, // Already completed level
      reward: '1.00',
      reward_currency: 'EUR',
      text: 'foo',
      required_views: 1,
    },
    {
      rank: 2, // Already completed level
      reward: '2.00',
      reward_currency: 'EUR',
      text: 'bar',
      required_views: 2,
    },
  ]);

  it('should generate a journey with fidelity', () => {
    const mockedState = fromJS({
      loaderPage: {
        communication,
        discount,
        promotionLevels,
        establishmentName,
      },
    });
    const journey = journeySelector(mockedState);
    expect(journey).toBeInstanceOf(List);
    expect(journey.size).toEqual(3);
  });

  it('should generate a journey with no fidelity', () => {
    const noFidelityPromotionLevels = fromJS([
      {
        rank: 100, // Already completed level
        reward: '15.00',
        reward_currency: 'EUR',
        text: 'Coffee',
        required_views: 2,
      },
    ]);
    const mockedState = fromJS({
      loaderPage: {
        communication,
        discount,
        promotionLevels: noFidelityPromotionLevels,
        establishmentName,
      },
    });
    const journey = journeySelector(mockedState);
    expect(journey).toBeInstanceOf(List);
    expect(journey.size).toEqual(2);
  });

  it('should generate a journey with no communication', () => {
    const mockedState = fromJS({
      loaderPage: {
        discount,
        promotionLevels,
        establishmentName,
      },
    });
    const journey = journeySelector(mockedState);
    expect(journey).toBeInstanceOf(List);
    expect(journey.size).toEqual(2);
  });

  it('should generate a journey with a banner', () => {
    const bannerText = 'foobar';
    const establishmentPicture = 'barbaz';
    const mockedState = fromJS({
      loaderPage: {
        establishmentName,
        establishmentPicture,
        communication,
        promotionLevels,
        discount,
        bannerText,
      },
    });

    const expectedResponse = fromJS({
      type: 'B',
      banner: {
        text: bannerText,
        picture: establishmentPicture,
      },
    });

    const journey = journeySelector(mockedState);
    expect(journey).toBeInstanceOf(List);
    expect(journey.get(journey.size - 1)).toEqual(expectedResponse);
    expect(journey.size).toEqual(4);
  });

  it('should generate a Journey with only a question, fidelity and a customer service', () => {
    const claimPhoneNumber = '010934809';
    const mockedState = fromJS({
      loaderPage: {
        promotionLevels,
        claimPhoneNumber,
      },
    });

    const expectedResponse = fromJS({
      type: 'S',
      customer_service: {
        phone_number: claimPhoneNumber,
      },
    });

    const journey = journeySelector(mockedState);
    expect(journey.get(journey.size - 1)).toEqual(expectedResponse);
    expect(journey.size).toEqual(3);
  });
});
