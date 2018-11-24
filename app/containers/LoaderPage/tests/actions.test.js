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
        claimPhoneNumber: '',
      };
      expect(promotionLevelsLoaded(promotionLevels)).toEqual(expected);
    });

    it('returns the promotionLevels without the 101 rank level if found. And returns the bannerText in the payload', () => {
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
        claimPhoneNumber: '',
      };

      expect(promotionLevelsLoaded(promotionLevelsWith101)).toEqual(expected);
    });

    it('returns the promotionLevels without the 102 rank level if found. And returns the phoneNumber in the payload ', () => {
      const claimPhoneNumber = '0129302183';
      const promotionLevelsWith102 = [
        ...promotionLevels,
        {
          rank: 102,
          text: claimPhoneNumber,
        },
      ];

      const expected = {
        type: GET_PROMOTION_LEVELS_SUCCESS,
        promotionLevels,
        claimPhoneNumber,
        bannerText: '',
      };

      expect(promotionLevelsLoaded(promotionLevelsWith102)).toEqual(expected);
    });

    it('returns the promotionLevels without the 101&102 rank level if found. And returns the phoneNumber and bannerText in the payload ', () => {
      const claimPhoneNumber = '0129302183';
      const bannerText = 'BannerTEST';
      const promotionLevelsWith101and102 = [
        ...promotionLevels,
        {
          rank: 101,
          text: bannerText,
        },
        {
          rank: 102,
          text: claimPhoneNumber,
        },
      ];

      const expected = {
        type: GET_PROMOTION_LEVELS_SUCCESS,
        promotionLevels,
        claimPhoneNumber,
        bannerText,
      };

      expect(promotionLevelsLoaded(promotionLevelsWith101and102)).toEqual(
        expected,
      );
    });
  });
});
