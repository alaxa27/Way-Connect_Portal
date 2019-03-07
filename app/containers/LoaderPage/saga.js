import { all, call, put, take, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ReactGA from 'react-ga';
import axiosInstance from '../../apiConfig';

import {
  LOADERPAGE_ANIMATIONS_SUCCESS,
  POST_CONNECTION_SUCCESS,
} from './constants';
import {
  establishmentLoaded,
  establishmentLoadingError,
  connectionPosted,
  connectionPostingError,
  discountLoaded,
  discountLoadingError,
} from './actions';

function getEstablishmentRequest() {
  return axiosInstance({
    method: 'get',
    url: `/customers/establishment/`,
  });
}

function postConnectionRequest() {
  return axiosInstance({
    method: 'post',
    url: `/customers/connect/`,
  });
}

function getDiscountRequest() {
  return axiosInstance({
    method: 'get',
    url: `/customers/discount/`,
  });
}

export function* getEstablishmentEffect() {
  try {
    const { data } = yield call(getEstablishmentRequest);
    yield put(establishmentLoaded(data.name));
  } catch (err) {
    yield put(establishmentLoadingError(err));
  }
}

export function* postConnectionEffect() {
  try {
    const { data } = yield call(postConnectionRequest);
    yield put(connectionPosted(data));
  } catch (err) {
    yield put(connectionPostingError(err));
  }
}

export function* getDiscountEffect() {
  try {
    const { data } = yield call(getDiscountRequest);
    yield put(discountLoaded(data));
  } catch (err) {
    yield put(discountLoadingError(err));
  }
}

export function* fetchAllEffect() {
  const startTime = Date.now();
  yield all([
    fork(getEstablishmentEffect),
    fork(getDiscountEffect),
    fork(postConnectionEffect),
  ]);
  yield take(POST_CONNECTION_SUCCESS);
  const execDuration = Date.now() - startTime;

  ReactGA.timing({
    category: 'RequestFetching',
    variable: 'loaderPage/fetchAll',
    value: execDuration, // in milliseconds
  });
}

// Individual exports for testing
export default function* loaderPageSaga() {
  yield all([take(LOADERPAGE_ANIMATIONS_SUCCESS), call(fetchAllEffect)]);
  yield put(push('/journey/0'));
}
