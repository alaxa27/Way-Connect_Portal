/*
 *
 * LoaderPage actions
 *
 */

import {
  GET_ESTABLISHMENT,
  GET_ESTABLISHMENT_SUCCESS,
  GET_ESTABLISHMENT_ERROR,

  POST_CONNECTION,
  POST_CONNECTION_SUCCESS,
  POST_CONNECTION_ERROR,
} from './constants';

export function loadEstablishment() {
  return {
    type: GET_ESTABLISHMENT,
  };
}

export function establishmentLoaded(name) {
  return {
    type: GET_ESTABLISHMENT_SUCCESS,
    name,
  };
}

export function establishmentLoadingError(error) {
  return {
    type: GET_ESTABLISHMENT_ERROR,
    error,
  };
}

export function postConnection() {
  return {
    type: POST_CONNECTION,
  };
}

export function connectionPosted () {
  return {
    type: POST_CONNECTION_SUCCESS,
  };
}

export function connectionPostingError() {
  return {
    type: POST_CONNECTION_ERROR,
  }
}
