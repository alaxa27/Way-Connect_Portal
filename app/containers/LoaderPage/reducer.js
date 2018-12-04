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
      return state.set('connection', fromJS(action.connection));
    case RETRIEVE_DISCOUNT_SUCCESS:
      return state.set('currentFidelityLevel', fromJS(action.discount));
    case RETRIEVE_DISCOUNT_ERROR:
      return state
        .setIn(['currentFidelityLevel', 'current_views'], 1)
        .setIn(['currentFidelityLevel', 'current_rank'], 1);
    default:
      return state;
  }
}

export default loaderPageReducer;
