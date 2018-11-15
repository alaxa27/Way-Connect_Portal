import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { GET_ESTABLISHMENT, POST_CONNECTION_SUCCESS } from './constants';
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

const macAddress = 'AA:AD:4D:F2:1B:1B';
const apiURL = 'http://localhost:5000';

function getEstablishmentRequest() {
  return axios({
    method: 'get',
    url: `${apiURL}/customers/establishment/`,
  });
}

function postConnectionRequest() {
  return axios({
    method: 'post',
    url: `${apiURL}/customers/${macAddress}/connect/`,
  });
}

function getDiscountRequest() {
  return axios({
    method: 'get',
    url: `${apiURL}/customers/${macAddress}/retrieve_discount/`,
  });
}

function getPromotionLevelsRequest() {
  return axios({
    method: 'get',
    url: `${apiURL}/customers/${macAddress}/levels/`,
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
    yield put(discountLoaded(data));
  } catch (err) {
    yield put(promotionLevelsLoadingError(err));
  }
}

export function* getDiscountEffect() {
  try {
    const { data } = yield call(getDiscountRequest);
    yield put(
      promotionLevelsLoaded({
        current_views: data.current_views,
        rank: data.promotion_level,
      }),
    );
  } catch (err) {
    yield put(discountLoadingError(err));
  }
}

// Individual exports for testing
export default function* loaderPageSaga() {
  yield takeLatest(GET_ESTABLISHMENT, getEstablishmentEffect);
  yield takeLatest(GET_ESTABLISHMENT, postConnectionEffect);
  yield takeLatest(POST_CONNECTION_SUCCESS, getDiscountEffect);
  yield takeLatest(POST_CONNECTION_SUCCESS, getPromotionLevelsEffect);
}
