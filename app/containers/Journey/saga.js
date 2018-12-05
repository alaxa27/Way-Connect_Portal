import { takeLatest, call, put, fork, select, all } from 'redux-saga/effects';
import { getDiscountEffect } from 'containers/LoaderPage/saga';
import axiosInstance from '../../apiConfig';
import {
  journeyCompleted,
  journeyCompletionError,
  communicationAcknowledged,
  acknowledgingCommunicationError,
  authenticated,
  authenticationError,
  questionAnswered,
  answeringQuestionError,
} from './actions';
import makeSelectJourney, { makeSelectCurrentID } from './selectors';
import { JOURNEY_ID_INCREASED, JOURNEY_ID_OUTOFRANGE } from './constants';

function completeJourneyRequest() {
  return axiosInstance({
    method: 'post',
    url: '/customers/complete/',
  });
}

function authenticateRequest() {
  return axiosInstance({
    method: 'get',
    url: '/customers/authenticate',
  });
}

function acknowledgeCommunicationRequest() {
  return axiosInstance({
    method: 'post',
    url: `/campaigns/communications/videos/acknowledge/`,
  });
}

function answerQuestionRequest(data) {
  return axiosInstance({
    method: 'post',
    url: '/questions/answers/',
    data,
  });
}

// function skipVideoRequest() {
//   return axiosInstance({
//     method: 'post',
//     url: `/campaigns/communications/videos/acknowledge/`,
//   });
// }

// export function* redirectEffect() {
//   window.location.href = 'http://google.com/';
// }

export function* completeJourneyEffect() {
  try {
    const { data } = yield call(completeJourneyRequest);
    yield put(journeyCompleted(data));
  } catch (err) {
    yield put(journeyCompletionError(err));
  }
}

export function* authenticateEffect() {
  try {
    const { data } = yield call(authenticateRequest);
    yield put(authenticated(data));
  } catch (err) {
    yield put(authenticationError(err));
  }
}

export function* answerQuestionEffect(id, type, answers) {
  const answer = {
    question: id,
  };

  switch (type) {
    case 'VALUE':
      // eslint-disable-next-line no-case-declarations
      const value1 = answers[0];
      answer.value = value1;
      break;
    case 'CHOICE':
      answer.choices = answers;
      break;
    default:
      break;
  }

  try {
    yield call(answerQuestionRequest, answer);
    yield put(questionAnswered());
  } catch (err) {
    yield put(answeringQuestionError(err));
  }
}

// export function* skipVideoEffect() {
//   try {
//     yield call(skipVideoRequest);
//     yield put(videoSkipped());
//   } catch (err) {
//     yield put(skippingVideoError(err));
//   }
// }

export function* acknowledgeCommunicationEffect() {
  try {
    yield call(acknowledgeCommunicationRequest);
    yield put(communicationAcknowledged());
  } catch (err) {
    yield put(acknowledgingCommunicationError(err));
  }
}

export function* handleCurrentEffect(journeyItem) {
  switch (journeyItem.type) {
    case 'C':
      yield call(acknowledgeCommunicationEffect);
      yield call(getDiscountEffect);
      break;
    case 'END':
      yield all([call(authenticateEffect), call(completeJourneyEffect)]);
      break;
    default:
      break;
  }
  return null;
}

export function* handlePreviousEffect(journeyItem) {
  switch (journeyItem.type) {
    case 'Q':
      yield call(
        answerQuestionEffect,
        journeyItem.question.id,
        journeyItem.question.type,
        journeyItem.question.defaultAnswers,
      );
      break;
    default:
      break;
  }
  return null;
}

export function* journeyIDIncreasedEffect() {
  const journeySelector = makeSelectJourney();
  const currentIDSelector = makeSelectCurrentID();

  const journey = yield select(journeySelector);
  const currentID = yield select(currentIDSelector);

  const currentJourneyItem = journey.get(currentID);
  yield fork(handleCurrentEffect, currentJourneyItem.toJS());
  if (currentID > 0) {
    const previousJourneyItem = journey.get(currentID - 1);
    yield fork(handlePreviousEffect, previousJourneyItem.toJS());
  }
}

export function* journeyIDOutOfRangeEffect() {
  const journeySelector = makeSelectJourney();
  const currentIDSelector = makeSelectCurrentID();

  const journey = yield select(journeySelector);
  const currentID = yield select(currentIDSelector);

  if (currentID > 0) {
    const previousJourneyItem = journey.get(currentID - 1);
    yield call(handlePreviousEffect, previousJourneyItem.toJS());
    yield call(handleCurrentEffect, { type: 'END' });
  }
}

// Individual exports for testing
export default function* journeySaga() {
  yield takeLatest(JOURNEY_ID_INCREASED, journeyIDIncreasedEffect);
  yield takeLatest(JOURNEY_ID_OUTOFRANGE, journeyIDOutOfRangeEffect);
}
