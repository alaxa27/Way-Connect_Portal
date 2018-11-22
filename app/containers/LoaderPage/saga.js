import { call, put, takeLatest, take, race, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axiosInstance from '../../apiConfig';

import {
  GET_ESTABLISHMENT,
  POST_CONNECTION_SUCCESS,
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
    console.log('effect1');
    const { data } = yield call(getDiscountRequest);
    console.log('effect2');
    yield put(discountLoaded(data));
    console.log('effect3');
  } catch (err) {
    console.log('effect4');
    yield put(discountLoadingError(err));
  }
}

// Individual exports for testing
export default function* loaderPageSaga() {
  yield all([
    takeLatest(GET_ESTABLISHMENT, getEstablishmentEffect),
    takeLatest(GET_ESTABLISHMENT, postConnectionEffect),
    takeLatest(POST_CONNECTION_SUCCESS, getPromotionLevelsEffect),
    takeLatest(POST_CONNECTION_SUCCESS, getDiscountEffect),
  ]);
  yield all([
    take(GET_PROMOTION_LEVELS_SUCCESS),
    race([take(RETRIEVE_DISCOUNT_ERROR), take(RETRIEVE_DISCOUNT_SUCCESS)]),
  ]);
  yield put(push('/journey/0'));
}
