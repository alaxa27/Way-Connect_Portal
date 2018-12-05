import { defaultAction, changeID } from '../actions';
import {
  DEFAULT_ACTION,
  JOURNEY_ID_INCREASED,
  JOURNEY_ID_DECREASED,
  JOURNEY_ID_OUTOFRANGE,
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
      };
      expect(changeID(1, 2, 3)).toEqual(expectedResult);
    });

    it('should dispatch JOURNEY_ID_DECREASED when we switch to lower ID', () => {
      const expectedResult = {
        type: JOURNEY_ID_DECREASED,
      };
      expect(changeID(2, 1, 3)).toEqual(expectedResult);
    });

    it('should dispatch JOURNEY_ID_OUTOFRANGE when we ID is greater or equal to length', () => {
      const expectedResult = {
        type: JOURNEY_ID_OUTOFRANGE,
      };
      expect(changeID(1, 2, 1)).toEqual(expectedResult);
    });
  });
});
