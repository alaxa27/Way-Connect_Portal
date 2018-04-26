// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store.

// Actions are triggered either by user through interactions or by an events, such as successful AJAX call.

// Read more on Actions - https://redux.js.org/docs/basics/Actions.html

import {
  POST_REGISTER_FORM
} from "../constants/ActionTypes";

export function postRegisterForm(payload) {
  console.log(payload.userData);
  return {
    type: POST_REGISTER_FORM,
    payload: payload
  };
}
