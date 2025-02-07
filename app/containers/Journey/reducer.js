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
  CHANGE_WATCHED_SECONDS,
  SURVEY_COMPLETED,
} from './constants';

export const initialState = fromJS({
  defaultAnswersList: {},
  previousID: -2,
  currentID: -1,
  currentJourneyItem: {},
  surveyResult: [],
  watchedSeconds: 0,
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
    case CHANGE_WATCHED_SECONDS:
      return state.set('watchedSeconds', action.seconds);
    case SURVEY_COMPLETED:
      return state.set('surveyResult', action.result);
    default:
      return state;
  }
}

export default journeyReducer;
