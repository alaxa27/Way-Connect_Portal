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
  RETRIEVE_DISCOUNT_ERROR,
} from './constants';

export const initialState = fromJS({
  establishmentName: '',
});

function loaderPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_ESTABLISHMENT_SUCCESS:
      return state.set('establishmentName', action.name);
    case POST_CONNECTION_SUCCESS:
      return state.set(
        'videoCommunication',
        action.communication ? action.communication.video : '',
      );
    case RETRIEVE_DISCOUNT_SUCCESS:
      console.log('success');
      return state
        .setIn(['discount', 'rank'], action.discount.promotion_level.rank)
        .setIn(['discount', 'current_views'], action.discount.current_views);
    case RETRIEVE_DISCOUNT_ERROR:
      console.log('error');
      return state
        .setIn(['discount', 'current_views'], 1)
        .setIn(['discount', 'rank'], 1);
    case GET_PROMOTION_LEVELS_SUCCESS:
      return state.set('promotionLevels', fromJS(action.promotionLevels));
    default:
      return state;
  }
}

export default loaderPageReducer;
