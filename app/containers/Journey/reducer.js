/*
 *
 * Journey reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SKIP_VIDEO,
  JOURNEY_ID_CHANGED,
  CURRENT_JOURNEY_ITEM_CHANGED,
  CHANGE_DEFAULT_ANSWERS_LIST,
} from './constants';

export const initialState = fromJS({
  defaultAnswersList: {},
  previousID: -2,
  currentID: -1,
  currentJourneyItem: {},
});

function journeyReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SKIP_VIDEO:
      return state;
    case JOURNEY_ID_CHANGED:
      return state
        .set('previousID', state.get('currentID'))
        .set('currentID', parseInt(action.currentID, 10));
    case CURRENT_JOURNEY_ITEM_CHANGED:
      return state.set('currentJourneyItem', action.currentJourneyItem);
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
