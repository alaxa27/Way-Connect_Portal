import { fromJS, List } from 'immutable';
import makeSelectJourney, {
  selectJourneyDomain,
  makeSelectCommunication,
  makeSelectFidelity,
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
    const videoCommunication = 'videoURL';
    const mockedState = fromJS({
      loaderPage: {
        videoCommunication,
      },
    });
    const expectedResponse = fromJS({
      type: 'C',
      communication: {
        video: videoCommunication,
      },
    });
    expect(communicationSelector(mockedState)).toEqual(expectedResponse);
  });

  it('sould return null if no communication', () => {
    const videoCommunication = '';
    const mockedState = fromJS({
      loaderPage: {
        videoCommunication,
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
    const mockedState = fromJS({
      loaderPage: {
        discount,
        promotionLevels,
        establishmentName,
      },
    });
    const expectedResponse = fromJS({
      type: 'F',
      fidelity: {
        establishment_name: establishmentName,
        current_level: discount,
        discounts: promotionLevels,
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
        offer: 'Coffee',
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

describe('makeSelectJourney', () => {
  const journeySelector = makeSelectJourney();

  const videoCommunication = 'url';
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

  it('should generate a journey with fidelity', () => {
    const mockedState = fromJS({
      loaderPage: {
        videoCommunication,
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
        offer: 'Coffee',
        required_views: 2,
      },
    ]);
    const mockedState = fromJS({
      loaderPage: {
        videoCommunication,
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
});
