// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store.

// Actions are triggered either by user through interactions or by an events, such as successful AJAX call.

// Read more on Actions - https://redux.js.org/docs/basics/Actions.html
import axios from "axios";

import {
  FETCH_INFORMATION,
  FETCH_INFORMATION_FULFILLED,
  FETCH_INFORMATION_REJECTED,
} from "../constants/ActionTypes";

export function fetchInformation(payload) {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_INFORMATION,
    })
    try {
      const mac_address = getState().information.informationData.mac_address;
      const response = await axios.get("http://localhost:8000/customers/known", {
        params: {
          mac_address: mac_address
        }
      });
      dispatch({
        type: FETCH_INFORMATION_FULFILLED,
        payload: response.data.result
      })
    } catch (error) {
      dispatch({
        type: FETCH_INFORMATION_REJECTED,
      })
      console.error(error);
    }
  }
}
