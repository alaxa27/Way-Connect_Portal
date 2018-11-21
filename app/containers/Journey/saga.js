import { takeLatest, call, put } from 'redux-saga/effects';
import axiosInstance from '../../apiConfig';
import { videoSkipped, skippingVideoError } from './actions';
import { SKIP_VIDEO } from './constants';

function skipVideoRequest() {
  return axiosInstance({
    method: 'post',
    url: `/customers/mac/acknowledge_communication/`,
  });
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
}
