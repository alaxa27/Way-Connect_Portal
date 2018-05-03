// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store.

// Actions are triggered either by user through interactions or by an events, such as successful AJAX call.

// Read more on Actions - https://redux.js.org/docs/basics/Actions.html
import axios from "axios";

import {
  FETCH_INFORMATION,
  FETCH_INFORMATION_FULFILLED,
  FETCH_INFORMATION_REJECTED,
  POST_CONNECT,
  POST_CONNECT_FULFILLED,
  POST_CONNECT_REJECTED
} from "../constants/ActionTypes";

export function fetchInformation(payload) {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_INFORMATION,
    })
    try {
      const informationData = getState().information.informationData;

      const response = await axios({
        method: "get",
        url: "http://localhost:8000/customers/known/",
        headers: {
          "X-API-Key": informationData.API_Key
        },
        params: {
          mac_address: informationData.mac_address
        }
      })
      dispatch({
        type: FETCH_INFORMATION_FULFILLED,
        payload: response.data
      })
      if (response.data.known) {
        dispatch(fetchCommunication())
      }
    } catch (error) {
      dispatch({
        type: FETCH_INFORMATION_REJECTED,
      })
      console.error(error);
    }
  }
}

function fetchCommunication(payload) {
  return async (dispatch, getState) => {
    dispatch({
      type: POST_CONNECT
    })
    try {
      const informationData = getState().information.informationData;
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/customers/connect/",
        headers: {
          "X-API-Key": informationData.API_Key
        },
        data: {
          mac_address: informationData.mac_address
        }
      })

      dispatch({
        type: POST_CONNECT_FULFILLED,
        payload: response.data.video
      })
    } catch (error) {
      dispatch({
        type: POST_CONNECT_REJECTED
      })
      console.error(error)
    }
  }
}
