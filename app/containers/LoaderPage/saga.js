import { delay } from 'redux-saga';
import { call, put, takeLatest, take, race, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axiosInstance from '../../apiConfig';

import {
  GET_ESTABLISHMENT,
  GET_PROMOTION_LEVELS_SUCCESS,
  RETRIEVE_DISCOUNT_ERROR,
  RETRIEVE_DISCOUNT_SUCCESS,
} from './constants';
import {
  establishmentLoaded,
  establishmentLoadingError,
  connectionPosted,
  connectionPostingError,
  promotionLevelsLoaded,
  promotionLevelsLoadingError,
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
    url: `/customers/mac/connect/`,
  });
}

function getPromotionLevelsRequest() {
  return axiosInstance({
    method: 'get',
    url: `/customers/levels/`,
  });
}

function getDiscountRequest() {
  return axiosInstance({
    method: 'get',
    url: `/customers/mac/retrieve_discount/`,
  });
}

export function* getEstablishmentEffect() {
  try {
    const { data } = yield call(getEstablishmentRequest);
    yield put(establishmentLoaded(data.name, data.picture));
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

export function* getPromotionLevelsEffect() {
  try {
    const { data } = yield call(getPromotionLevelsRequest);
    yield put(promotionLevelsLoaded(data));
  } catch (err) {
    yield put(promotionLevelsLoadingError(err));
  }
}

export function* getDiscountEffect() {
  try {
    yield call(delay, 10000);
    const { data } = yield call(getDiscountRequest);
    yield put(discountLoaded(data));
  } catch (err) {
    yield put(discountLoadingError(err));
  }
}

export function* fetchAllEffect() {
  yield fork(getEstablishmentEffect);
  yield fork(postConnectionEffect);
  yield fork(getPromotionLevelsEffect);
  yield fork(getDiscountEffect);
}

// Individual exports for testing
export default function* loaderPageSaga() {
  yield takeLatest(GET_ESTABLISHMENT, fetchAllEffect);
  yield take(GET_PROMOTION_LEVELS_SUCCESS);
  yield race([take(RETRIEVE_DISCOUNT_ERROR), take(RETRIEVE_DISCOUNT_SUCCESS)]);
  yield put(push('/journey/0'));
}
