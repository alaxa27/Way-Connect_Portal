/*
 *
 * Journey reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SKIP_VIDEO } from './constants';

export const initialState = fromJS({});

function journeyReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SKIP_VIDEO:
      return state;
    default:
      return state;
  }
}

export default journeyReducer;
