/*
 *
 * Journey reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SKIP_VIDEO,
  JOURNEY_ID_INCREASED,
  JOURNEY_ID_DECREASED,
  JOURNEY_ID_OUTOFRANGE,
  CHANGE_DEFAULT_ANSWERS_LIST,
} from './constants';

export const initialState = fromJS({
  defaultAnswersList: {},
  currentID: -1,
});

function journeyReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SKIP_VIDEO:
      return state;
    case JOURNEY_ID_INCREASED:
      return state.set('currentID', action.currentID);
    case JOURNEY_ID_DECREASED:
      return state.set('currentID', action.currentID);
    case JOURNEY_ID_OUTOFRANGE:
      return state.set('currentID', action.currentID);
    case CHANGE_DEFAULT_ANSWERS_LIST:
      return state.setIn(
        ['defaultAnswersList', action.questionID],
        fromJS(action.defaultAnswers),
      );
    default:
      return state;
  }
}

export default journeyReducer;
