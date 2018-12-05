import { fromJS } from 'immutable';
import makeSelectJourney, { selectJourneyDomain } from '../selectors';

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
        connection: [],
      },
    });
    const journey = journeySelector(mockedState);
    expect(journey).toEqual(fromJS([]));
  });

  it('should generate a journey with the right default answers', () => {
    const connection = fromJS([
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
    ]);

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
        .setIn([0, 'question', 'defaultAnswers'], fromJS([1]))
        .setIn([1, 'question', 'defaultAnswers'], fromJS([])),
    );
  });

  it('should generate a journey with the current_level if fidelity is found', () => {
    const connection = fromJS([
      {
        type: 'F',
        fidelity: {
          levels: 'foo',
        },
      },
    ]);

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
        .setIn([0, 'fidelity', 'current_level'], currentFidelityLevel)
        .setIn([0, 'fidelity', 'establishment_name'], establishmentName),
    );
  });
});
