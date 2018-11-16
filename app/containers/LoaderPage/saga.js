import { call, put, takeLatest, take, all, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';

import { makeSelectMac } from './selectors';

import {
  SAVE_BOX_INFORMATIONS,
  GET_ESTABLISHMENT,
  POST_CONNECTION_SUCCESS,
  RETRIEVE_DISCOUNT_SUCCESS,
  GET_PROMOTION_LEVELS_SUCCESS,
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

const apiURL = 'http://localhost:5000';

function getEstablishmentRequest() {
  return axios({
    method: 'get',
    url: `${apiURL}/customers/establishment/`,
  });
}

function postConnectionRequest(mac) {
  return axios({
    method: 'post',
    url: `${apiURL}/customers/${mac}/connect/`,
  });
}

function getDiscountRequest(mac) {
  return axios({
    method: 'get',
    url: `${apiURL}/customers/${mac}/retrieve_discount/`,
  });
}

function getPromotionLevelsRequest() {
  return axios({
    method: 'get',
    url: `${apiURL}/customers/levels/`,
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
    const mac = yield select(makeSelectMac());
    const { data } = yield call(postConnectionRequest, mac);
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
    const mac = yield select(makeSelectMac());
    const { data } = yield call(getDiscountRequest, mac);
    yield put(discountLoaded(data));
  } catch (err) {
    yield put(discountLoadingError(err));
  }
}

// Individual exports for testing
export default function* loaderPageSaga() {
  yield take(SAVE_BOX_INFORMATIONS);
  yield all([
    takeLatest(GET_ESTABLISHMENT, getEstablishmentEffect),
    takeLatest(GET_ESTABLISHMENT, postConnectionEffect),
    takeLatest(POST_CONNECTION_SUCCESS, getDiscountEffect),
    takeLatest(POST_CONNECTION_SUCCESS, getPromotionLevelsEffect),
  ]);
  yield all([
    take(RETRIEVE_DISCOUNT_SUCCESS),
    take(GET_PROMOTION_LEVELS_SUCCESS),
  ]);
  yield put(push('/journey/0'));
}
