import { defaultAction, promotionLevelsLoaded } from '../actions';
import { DEFAULT_ACTION, GET_PROMOTION_LEVELS_SUCCESS } from '../constants';

describe('LoaderPage actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });

  describe('promotionLevelsLoaded action', () => {
    const promotionLevels = [
      {
        rank: 1,
        text: 'foo',
      },
      {
        rank: 2,
        text: 'bar',
      },
    ];

    it('returns the promotionLevels as given if no 101 rank level is found', () => {
      const expected = {
        type: GET_PROMOTION_LEVELS_SUCCESS,
        promotionLevels,
        bannerText: '',
      };
      expect(promotionLevelsLoaded(promotionLevels)).toEqual(expected);
    });

    it('returns the promotionLevels without the 101 rank level if found. And fires bannerTextLoaded action with', () => {
      const bannerText = 'BANNER TXT';
      const promotionLevelsWith101 = [
        ...promotionLevels,
        {
          rank: 101,
          text: bannerText,
        },
      ];

      const expected = {
        type: GET_PROMOTION_LEVELS_SUCCESS,
        promotionLevels,
        bannerText,
      };

      expect(promotionLevelsLoaded(promotionLevelsWith101)).toEqual(expected);
    });
  });
});
