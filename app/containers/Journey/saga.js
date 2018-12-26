import { takeEvery, call, put, select, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
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
  changeCurrentJourneyItem,
  changeID,
} from './actions';
import {
  makeSelectJourneyItem,
  makeSelectPreviousID,
  makeSelectCurrentID,
} from './selectors';
import {
  JOURNEY_ID_CHANGED,
  CURRENT_JOURNEY_ITEM_INCREMENTED,
} from './constants';

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
    yield call(completeJourneyRequest);
    yield put(journeyCompleted());
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
      yield call(completeJourneyEffect);
      yield call(authenticateEffect);
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

export function* journeyIDChangedEffect() {
  const previousIDSelector = makeSelectPreviousID();
  const currentIDSelector = makeSelectCurrentID();

  const previousID = yield select(previousIDSelector);
  const currentID = yield select(currentIDSelector);

  const previousJourneyItemSelector = makeSelectJourneyItem(previousID);
  const currentJourneyItemSelector = makeSelectJourneyItem(currentID);

  const currentJourneyItem = yield select(currentJourneyItemSelector);
  const previousJourneyItem = yield select(previousJourneyItemSelector);

  yield put(changeCurrentJourneyItem(currentJourneyItem));
  yield all([
    call(handlePreviousEffect, previousJourneyItem.toJS()),
    call(handleCurrentEffect, currentJourneyItem.toJS()),
  ]);
}

export function* goToNextJourneyItemEffect() {
  const currentIDSelector = makeSelectCurrentID();

  const currentID = yield select(currentIDSelector);
  const nextID = currentID + 1;

  yield all([put(changeID(nextID)), put(push(`/journey/${nextID}`))]);
}

// Individual exports for testing
export default function* journeySaga() {
  yield takeEvery(JOURNEY_ID_CHANGED, journeyIDChangedEffect);
  yield takeEvery(CURRENT_JOURNEY_ITEM_INCREMENTED, goToNextJourneyItemEffect);
}
