/*
 *
 * Journey actions
 *
 */

import {
  DEFAULT_ACTION,
  JOURNEY_ID_OUTOFRANGE,
  JOURNEY_ID_INCREASED,
  JOURNEY_ID_DECREASED,
  CHANGE_DEFAULT_ANSWERS_LIST,
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
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeID(prevID, currentID, length) {
  if (currentID >= length) return { type: JOURNEY_ID_OUTOFRANGE, currentID };
  if (prevID < currentID) {
    return {
      type: JOURNEY_ID_INCREASED,
      currentID,
    };
  }
  return {
    type: JOURNEY_ID_DECREASED,
    currentID,
  };
}

export function changeDefaultAnswersList(defaultAnswers, questionID) {
  return {
    type: CHANGE_DEFAULT_ANSWERS_LIST,
    defaultAnswers,
    questionID,
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

export function journeyCompleted(data) {
  window.location.href = data.url;
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

export function authenticated(data) {
  window.location.href = data.url;
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
