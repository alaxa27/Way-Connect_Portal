// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store.

// Actions are triggered either by user through interactions or by an events, such as successful AJAX call.

// Read more on Actions - https://redux.js.org/docs/basics/Actions.html

import {
  FETCH_FIDELITY,
  FETCH_FIDELITY_FULFILLED,
  FETCH_FIDELITY_REJECTED,
  FETCH_DISCOUNT,
  FETCH_DISCOUNT_FULFILLED,
  FETCH_DISCOUNT_REJECTED
} from "../constants/ActionTypes";

export function fetchFidelity(payload) {
  return (dispatch) => {
    dispatch({
      type: FETCH_FIDELITY,
    })
    payload.rate = 0.8
    setTimeout(function() {
      dispatch({
        type: FETCH_FIDELITY_FULFILLED,
        payload: payload
      });
    }, 2000);
  }
}

export function fetchDiscount(payload) {
  return (dispatch) => {
    dispatch({
      type: FETCH_DISCOUNT
    })
    payload.rate = 0;
    setTimeout(function() {
      dispatch({
        type: FETCH_DISCOUNT_FULFILLED,
        payload: payload
      });
    }, 1000);
  }
}
