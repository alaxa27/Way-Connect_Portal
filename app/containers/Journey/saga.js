import { takeLatest, call, put, select } from 'redux-saga/effects';
import { makeSelectMac } from 'containers/LoaderPage/selectors';
import axiosInstance from '../../apiConfig';
import { videoSkipped, skippingVideoError } from './actions';
import { SKIP_VIDEO } from './constants';

function skipVideoRequest(mac) {
  return axiosInstance({
    method: 'post',
    url: `/customers/${mac}/acknowledge_communication/`,
  });
}

export function* skipVideoEffect() {
  try {
    const mac = yield select(makeSelectMac());
    yield call(skipVideoRequest, mac);
    yield put(videoSkipped());
  } catch (err) {
    yield put(skippingVideoError(err));
  }
}

// Individual exports for testing
export default function* journeySaga() {
  yield takeLatest(SKIP_VIDEO, skipVideoEffect);
}
