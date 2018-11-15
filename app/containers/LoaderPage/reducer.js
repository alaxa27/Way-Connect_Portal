/*
 *
 * LoaderPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  POST_CONNECTION_SUCCESS,
  GET_ESTABLISHMENT_SUCCESS,
  GET_PROMOTION_LEVELS_SUCCESS,
  RETRIEVE_DISCOUNT_SUCCESS,
} from './constants';

export const initialState = fromJS({
  establishmentName: '',
  communication: {
    video: '',
  },
  discount: {
    promotion_level: {
      rank: 1,
    },
    current_views: 0,
  },
  promotionLevels: [
    {
      rank: 1,
      required_views: 0,
      reward: '0',
      reward_currency: '',
      text: '',
    },
  ],
});

function loaderPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_ESTABLISHMENT_SUCCESS:
      return state.set('establishmentName', action.name);
    case POST_CONNECTION_SUCCESS:
      return state.set('communication', action.communication);
    case RETRIEVE_DISCOUNT_SUCCESS:
      return state.set('discount', action.discount);
    case GET_PROMOTION_LEVELS_SUCCESS:
      return state.set('promotionLevels', action.promotionLevels);
    default:
      return state;
  }
}

export default loaderPageReducer;
