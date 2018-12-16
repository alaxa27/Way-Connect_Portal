import { fromJS } from 'immutable';
import makeSelectJourney, {
  selectJourneyDomain,
  makeSelectJourneySize,
  makeSelectJourneyItem,
  makeSelectCurrentJourneyItem,
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

describe('makeSelectJourneySize', () => {
  const mockedState = fromJS({
    loaderPage: {
      connection: {
        journey: [{ a: 1 }, { b: 2 }, { c: 3 }],
      },
    },
  });
  it('should give the correct size', () => {
    const journeySizeSelector = makeSelectJourneySize();
    const expectedResult = 3;
    expect(journeySizeSelector(mockedState)).toEqual(expectedResult);
  });
});

describe('makeSelectJourneyItem', () => {
  const mockedState = fromJS({
    loaderPage: {
      connection: {
        journey: [{ a: 1 }, { b: 2 }, { c: 3 }],
      },
    },
    journey: {
      currentID: 2,
      previousID: 0,
    },
  });

  it('should select the right item when ID is >= 0 && < length', () => {
    const journeyItemSelector = makeSelectJourneyItem(1);
    const expectedResult = fromJS({
      b: 2,
    });
    const journeyItem = journeyItemSelector(mockedState);
    expect(journeyItem).toEqual(expectedResult);
  });

  it('should select the END item when ID is == length', () => {
    const journeyItemSelector = makeSelectJourneyItem(3);

    const expectedResult = fromJS({ type: 'END' });

    const journeyItem = journeyItemSelector(mockedState);
    expect(journeyItem).toEqual(expectedResult);
  });

  it('should select the OUT_OF_RANGE item when ID is < 0 or > length', () => {
    const expectedResult = fromJS({ type: 'OUT_OF_RANGE' });

    const lowerJourneyItemSelector = makeSelectJourneyItem(-3);
    const lowerJourneyItem = lowerJourneyItemSelector(mockedState);

    const greaterJourneyItemSelector = makeSelectJourneyItem(10);
    const greaterJourneyItem = greaterJourneyItemSelector(mockedState);

    expect(lowerJourneyItem).toEqual(expectedResult);
    expect(greaterJourneyItem).toEqual(expectedResult);
  });
});

describe('makeSelectCurrentJourneyItem', () => {
  const currentJourneyItemSelector = makeSelectCurrentJourneyItem();
  const mockedState = fromJS({
    journey: {
      currentJourneyItem: { a: 2 },
    },
  });

  it('should return the right item from the journey', () => {
    const expectedResult = fromJS({ a: 2 });
    const currentJourneyItem = currentJourneyItemSelector(mockedState);
    expect(currentJourneyItem).toEqual(expectedResult);
  });
});

describe('makeSelectJourney', () => {
  const journeySelector = makeSelectJourney();

  const currentFidelityLevel = fromJS({
    current_rank: 1,
    current_views: 3,
  });
  const establishmentName = 'testName';

  it('should generate an empty journey is nothing is in', () => {
    const mockedState = fromJS({
      loaderPage: {
        establishmentName,
        currentFidelityLevel,
        connection: {
          journey: [],
        },
      },
    });
    const journey = journeySelector(mockedState);
    expect(journey).toEqual(fromJS([]));
  });

  it('should generate a journey with the right default answers', () => {
    const connection = fromJS({
      journey: [
        {
          type: 'Q',
          question: {
            id: 'a3f32a',
          },
        },
        {
          type: 'Q',
          question: {
            id: '098',
          },
        },
      ],
    });

    const mockedState = fromJS({
      loaderPage: {
        establishmentName,
        connection,
        currentFidelityLevel,
      },
      journey: {
        defaultAnswersList: {
          a3f32a: [1],
          o21dad: [2, 3],
        },
      },
    });

    const journey = journeySelector(mockedState);
    expect(journey).toEqual(
      connection
        .get('journey')
        .setIn([0, 'question', 'defaultAnswers'], fromJS([1]))
        .setIn([1, 'question', 'defaultAnswers'], fromJS([])),
    );
  });

  it('should generate a journey with the current_level if fidelity is found', () => {
    const connection = fromJS({
      journey: [
        {
          type: 'F',
          fidelity: {
            levels: 'foo',
          },
        },
      ],
    });

    const mockedState = fromJS({
      loaderPage: {
        establishmentName,
        connection,
        currentFidelityLevel,
      },
    });

    const journey = journeySelector(mockedState);
    expect(journey).toEqual(
      connection
        .get('journey')
        .setIn([0, 'fidelity', 'current_level'], currentFidelityLevel)
        .setIn([0, 'fidelity', 'establishment_name'], establishmentName),
    );
  });
});
