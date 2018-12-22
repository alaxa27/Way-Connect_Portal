import { call, put, takeLatest, take, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axiosInstance from '../../apiConfig';

import { GET_ESTABLISHMENT, POST_CONNECTION_SUCCESS } from './constants';
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
  yield fork(getEstablishmentEffect);
  yield fork(postConnectionEffect);
  yield fork(getDiscountEffect);
}

// Individual exports for testing
export default function* loaderPageSaga() {
  yield takeLatest(GET_ESTABLISHMENT, fetchAllEffect);
  yield take(POST_CONNECTION_SUCCESS);
  yield put(push('/journey/0'));
}
