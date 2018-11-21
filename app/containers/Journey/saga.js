import { takeLatest, call, put, take } from 'redux-saga/effects';
import axiosInstance from '../../apiConfig';
import {
  videoSkipped,
  skippingVideoError,
  authenticationError,
  authenticated,
} from './actions';
import {
  SKIP_VIDEO,
  SKIP_VIDEO_SUCCESS,
  AUTHENTICATE,
  AUTHENTICATE_SUCCESS,
} from './constants';

function authenticateRequest() {
  return axiosInstance({
    method: 'get',
    url: '/customers/authenticate',
  });
}

function skipVideoRequest() {
  return axiosInstance({
    method: 'post',
    url: `/customers/mac/acknowledge_communication/`,
  });
}

export function* redirectEffect() {
  window.location.href = 'http://google.com/';
}

export function* authenticateEffect() {
  try {
    yield call(authenticateRequest);
    yield put(authenticated());
  } catch (err) {
    yield put(authenticationError(err));
  }
}

export function* skipVideoEffect() {
  try {
    yield call(skipVideoRequest);
    yield put(videoSkipped());
  } catch (err) {
    yield put(skippingVideoError(err));
  }
}

// Individual exports for testing
export default function* journeySaga() {
  yield takeLatest(SKIP_VIDEO, skipVideoEffect);
  yield take(SKIP_VIDEO_SUCCESS);
  yield takeLatest(AUTHENTICATE, authenticateEffect);
  yield takeLatest(AUTHENTICATE_SUCCESS, redirectEffect);
}
