/*
 *
 * Journey actions
 *
 */

import {
  DEFAULT_ACTION,
  JOURNEY_ID_CHANGED,
  CURRENT_JOURNEY_ITEM_CHANGED,
  CURRENT_JOURNEY_ITEM_INCREMENTED,
  CHANGE_DEFAULT_ANSWERS_LIST,
  CHANGE_WATCHED_SECONDS,
  ACKNOWLEDGE_COMMUNICATION,
  ACKNOWLEDGE_COMMUNICATION_SUCCESS,
  ACKNOWLEDGE_COMMUNICATION_ERROR,
  SKIP_VIDEO,
  SKIP_VIDEO_SUCCESS,
  SKIP_VIDEO_ERROR,
  COMPLETE_JOURNEY,
  COMPLETE_JOURNEY_SUCCESS,
  COMPLETE_JOURNEY_ERROR,
  AUTHENTICATE,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_ERROR,
  ANSWER_QUESTION,
  ANSWER_QUESTION_SUCCESS,
  ANSWER_QUESTION_ERROR,
  REDIRECTION_CLICKED,
  SURVEY_COMPLETED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeID(currentID) {
  return {
    type: JOURNEY_ID_CHANGED,
    currentID,
  };
}

export function changeCurrentJourneyItem(currentJourneyItem) {
  return {
    type: CURRENT_JOURNEY_ITEM_CHANGED,
    currentJourneyItem,
  };
}

export function changeDefaultAnswersList(defaultAnswers, questionID) {
  return {
    type: CHANGE_DEFAULT_ANSWERS_LIST,
    defaultAnswers,
    questionID,
  };
}

export function changeWatchedSeconds(seconds) {
  return {
    type: CHANGE_WATCHED_SECONDS,
    seconds,
  };
}

export function onRedirectionClick() {
  return {
    type: REDIRECTION_CLICKED,
  };
}

export function goToNextJourneyItem() {
  return {
    type: CURRENT_JOURNEY_ITEM_INCREMENTED,
  };
}

export function acknowledgeCommunication() {
  return {
    type: ACKNOWLEDGE_COMMUNICATION,
  };
}

export function communicationAcknowledged() {
  return {
    type: ACKNOWLEDGE_COMMUNICATION_SUCCESS,
  };
}

export function acknowledgingCommunicationError() {
  return {
    type: ACKNOWLEDGE_COMMUNICATION_ERROR,
  };
}

export function skipVideo() {
  return {
    type: SKIP_VIDEO,
  };
}

export function videoSkipped() {
  return {
    type: SKIP_VIDEO_SUCCESS,
  };
}

export function skippingVideoError() {
  return {
    type: SKIP_VIDEO_ERROR,
  };
}

export function completeJourney() {
  return {
    type: COMPLETE_JOURNEY,
  };
}

export function journeyCompleted() {
  return {
    type: COMPLETE_JOURNEY_SUCCESS,
  };
}

export function journeyCompletionError() {
  return {
    type: COMPLETE_JOURNEY_ERROR,
  };
}

export function authenticate() {
  return {
    type: AUTHENTICATE,
  };
}

export function authenticated() {
  return {
    type: AUTHENTICATE_SUCCESS,
  };
}

export function authenticationError() {
  return {
    type: AUTHENTICATE_ERROR,
  };
}

export function answerQuestion() {
  return {
    type: ANSWER_QUESTION,
  };
}

export function questionAnswered() {
  return {
    type: ANSWER_QUESTION_SUCCESS,
  };
}

export function answeringQuestionError() {
  return {
    type: ANSWER_QUESTION_ERROR,
  };
}

export function submitSurveyResult(result) {
  return {
    type: SURVEY_COMPLETED,
    result,
  };
}
