// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store.

// Actions are triggered either by user through interactions or by an events, such as successful AJAX call.

// Read more on Actions - https://redux.js.org/docs/basics/Actions.html
import {
  axiosInstance
} from "../constants/ApiConfig.js";
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
    });
    try {
      const response = await axiosInstance({
        method: "get",
        url: "/customers/known/",
        params: {
          mac_address: payload.mac_address
        }
      });
      dispatch({
        type: FETCH_INFORMATION_FULFILLED,
        payload: { ...response.data,
          mac_address: payload.mac_address,
          API_Key: payload.API_Key,
          token: payload.token
        }
      });
      if (response.data.known) {
        dispatch(fetchConnection());
      }
    } catch (error) {
      dispatch({
        type: FETCH_INFORMATION_REJECTED,
      });
      console.error(error);
    }
  };
}


export function fetchConnection(payload) {
  return async (dispatch, getState) => {
    axiosInstance.defaults.headers.common["X-API-Key"] = payload.API_Key;
    dispatch({
      type: POST_CONNECT
    });
    try {
      const response = await axiosInstance({
        method: "post",
        url: "/customers/connect/",
        data: {
          mac_address: payload.mac_address
        }
      });

      dispatch({
        type: POST_CONNECT_FULFILLED,
        payload: {
          ...payload,
          communicationURL: response.data.video,
        }
      });
    } catch (error) {
      dispatch({
        type: POST_CONNECT_REJECTED
      });
      console.error(error);
    }
  };
}
