import {
  takeEvery,
  takeLatest,
  call,
  cancel,
  fork,
  put,
  select,
  all,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ReactGA from 'react-ga';

import { getDiscountEffect } from 'containers/LoaderPage/saga';
import axiosInstance from '../../apiConfig';
import {
  changeID,
  journeyCompleted,
  journeyCompletionError,
  communicationAcknowledged,
  acknowledgingCommunicationError,
  authenticated,
  authenticationError,
  questionAnswered,
  answeringQuestionError,
  changeCurrentJourneyItem,
} from './actions';
import {
  makeSelectJourneyItem,
  makeSelectPreviousID,
  makeSelectCurrentID,
  makeSelectSurveyResult,
  makeSelectWatchedSeconds,
} from './selectors';
import {
  JOURNEY_ID_CHANGED,
  CURRENT_JOURNEY_ITEM_INCREMENTED,
  REDIRECTION_CLICKED,
} from './constants';

function completeJourneyRequest() {
  return axiosInstance({
    method: 'post',
    url: '/customers/complete/',
  });
}

function clickRequest() {
  return axiosInstance({
    method: 'post',
    url: '/campaigns/communications/videos/click/',
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

function skipRequest(seconds) {
  return axiosInstance({
    method: 'post',
    url: '/campaigns/communications/videos/skip/',
    data: { seconds },
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
    yield call(ReactGA.event, {
      category: 'CompleteJourney',
      action: 'started',
    });
    yield call(completeJourneyRequest);
    yield put(journeyCompleted());
    yield call(ReactGA.event, {
      category: 'CompleteJourney',
      action: 'success',
    });
  } catch (err) {
    yield put(journeyCompletionError(err));
    yield call(ReactGA.event, {
      category: 'CompleteJourney',
      action: 'fail',
    });
  }
}

export function* authenticateEffect() {
  try {
    yield call(authenticateRequest);
    yield put(authenticated());
  } catch (err) {
    yield put(authenticationError(err));
  }
}

export function* answerSurveyEffect() {
  const surveyResultSelector = makeSelectSurveyResult();
  const result = yield select(surveyResultSelector);
  yield all(
    Object.keys(result).map(id =>
      call(answerQuestionEffect, id, result[id].type, result[id].answer),
    ),
  );
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
      // eslint-disable-next-line no-case-declarations
      const completeTask = yield fork(completeJourneyEffect);
      yield call(authenticateEffect);
      yield cancel(completeTask);
      window.location.href = 'https://google.com';
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
    case 'C':
      switch (journeyItem.communication.type) {
        case 'VIDEO':
          yield call(skipEffect);
          break;
        case 'SURVEY':
          yield call(answerSurveyEffect);
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
  return null;
}

export function* clickEffect() {
  try {
    yield call(clickRequest);
  } catch (err) {
    console.error(err);
  }
}

export function* redirectionClickedEffect() {
  const currentIDSelector = makeSelectCurrentID();
  const currentID = yield select(currentIDSelector);

  const currentJourneyItemSelector = makeSelectJourneyItem(currentID);
  const currentJourneyItem = yield select(currentJourneyItemSelector);

  const link = currentJourneyItem.getIn([
    'communication',
    'redirection',
    'target',
  ]);

  const skipTask = yield fork(skipEffect);
  const clickTask = yield fork(clickEffect);
  yield call(authenticateEffect);
  yield all([cancel(skipTask), cancel(clickTask)]);
  window.location.href = link;
}

export function* skipEffect() {
  const watchedSecondsSelector = makeSelectWatchedSeconds();
  const watchedSeconds = yield select(watchedSecondsSelector);

  try {
    yield call(skipRequest, watchedSeconds);
  } catch (err) {
    console.error(err);
  }
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
  if (previousID < currentID)
    yield fork(handlePreviousEffect, previousJourneyItem.toJS());
  yield fork(handleCurrentEffect, currentJourneyItem.toJS());
}

export function* goToNextJourneyItemEffect() {
  const currentIDSelector = makeSelectCurrentID();

  const currentID = yield select(currentIDSelector);
  const nextID = currentID + 1;

  yield all([put(push(`/journey/${nextID}`)), put(changeID(nextID))]);
  // yield put(push(`/journey/${nextID}`));
}

// Individual exports for testing
export default function* journeySaga() {
  yield takeEvery(JOURNEY_ID_CHANGED, journeyIDChangedEffect);
  yield takeLatest(REDIRECTION_CLICKED, redirectionClickedEffect);
  yield takeEvery(CURRENT_JOURNEY_ITEM_INCREMENTED, goToNextJourneyItemEffect);
}
