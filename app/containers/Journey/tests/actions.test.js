import {
  defaultAction,
  changeID,
  changeCurrentJourneyItem,
  changeDefaultAnswersList,
} from '../actions';
import {
  DEFAULT_ACTION,
  JOURNEY_ID_CHANGED,
  CHANGE_DEFAULT_ANSWERS_LIST,
  CURRENT_JOURNEY_ITEM_CHANGED,
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
    it('should dispatch JOURNEY_ID_CHANGED when we switch ID', () => {
      const expectedResult = {
        type: JOURNEY_ID_CHANGED,
        currentID: 2,
      };

      expect(changeID(2)).toEqual(expectedResult);
    });
  });

  describe('changeCurrentJourneyItem action', () => {
    it('should dispatch CURRENT_JOURNEY_ITEM_CHANGED when we change currentID', () => {
      const expectedResult = {
        type: CURRENT_JOURNEY_ITEM_CHANGED,
        currentJourneyItem: { a: 3 },
      };

      expect(changeCurrentJourneyItem({ a: 3 })).toEqual(expectedResult);
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
