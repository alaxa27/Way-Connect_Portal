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
} from './constants';

export const initialState = fromJS({
  establishmentName: '',
  t: 0,
  a: 1,
});

function loaderPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case POST_CONNECTION_SUCCESS:
      return state.set('t', 2);
    case GET_ESTABLISHMENT_SUCCESS:
      console.log(action.name);
      return state.set('establishmentName', action.name);
    default:
      return state;
  }
}

export default loaderPageReducer;
