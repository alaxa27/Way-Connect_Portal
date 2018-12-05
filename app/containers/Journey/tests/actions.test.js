import { defaultAction, changeID, changeDefaultAnswersList } from '../actions';
import {
  DEFAULT_ACTION,
  JOURNEY_ID_INCREASED,
  JOURNEY_ID_DECREASED,
  JOURNEY_ID_OUTOFRANGE,
  CHANGE_DEFAULT_ANSWERS_LIST,
} from '../constants';

describe('Journey actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe('changeID action', () => {
    it('should dispatch JOURNEY_ID_INCREASED when we switch to greater ID', () => {
      const expectedResult = {
        type: JOURNEY_ID_INCREASED,
        currentID: 2,
      };

      expect(changeID(1, 2, 3)).toEqual(expectedResult);
    });

    it('should dispatch JOURNEY_ID_DECREASED when we switch to lower ID', () => {
      const expectedResult = {
        type: JOURNEY_ID_DECREASED,
        currentID: 1,
      };

      expect(changeID(2, 1, 3)).toEqual(expectedResult);
    });

    it('should dispatch JOURNEY_ID_OUTOFRANGE when we ID is greater or equal to length', () => {
      const expectedResult = {
        type: JOURNEY_ID_OUTOFRANGE,
        currentID: 2,
      };

      expect(changeID(1, 2, 1)).toEqual(expectedResult);
    });
  });

  describe('changeDefaultAnswersList action', () => {
    it('should dispatch the right Action with the arguments', () => {
      const expectedResult = {
        type: CHANGE_DEFAULT_ANSWERS_LIST,
        defaultAnswers: 'foo',
        questionID: 'bar',
      };

      expect(changeDefaultAnswersList('foo', 'bar')).toEqual(expectedResult);
    });
  });
});
