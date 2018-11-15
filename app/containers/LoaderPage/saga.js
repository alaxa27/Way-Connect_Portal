import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { GET_ESTABLISHMENT, GET_ESTABLISHMENT_SUCCESS } from './constants';
import {
  establishmentLoaded,
  establishmentLoadingError,
  connectionPosted,
  connectionPostingError,
} from './actions';

function getEstablishmentRequest() {
  return axios({
    method: 'get',
    url: 'http://localhost:5000/customers/establishment/',
  });
}

function postConnectionRequest() {
  return axios({
    method: 'post',
    url: 'http://localhost:5000/customers/1/connect/',
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
    yield put(connectionPosted(data.name));
  } catch (err) {
    yield put(connectionPostingError(err));
  }
}

// Individual exports for testing
export default function* loaderPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ESTABLISHMENT, getEstablishmentEffect);
  yield takeLatest(GET_ESTABLISHMENT, postConnectionEffect);
}
