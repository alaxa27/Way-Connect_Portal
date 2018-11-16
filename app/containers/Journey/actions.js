/*
 *
 * Journey actions
 *
 */

import {
  DEFAULT_ACTION,
  SKIP_VIDEO,
  SKIP_VIDEO_SUCCESS,
  SKIP_VIDEO_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function skipVideo() {
  return {
    type: SKIP_VIDEO,
  };
}

export function videoSkipped() {
  return {
    type: SKIP_VIDEO_SUCCESS,
  };
}

export function skippingVideoError() {
  return {
    type: SKIP_VIDEO_ERROR,
  };
}
