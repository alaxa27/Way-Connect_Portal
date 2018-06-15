// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store.

// Actions are triggered either by user through interactions or by an events, such as successful AJAX call.

// Read more on Actions - https://redux.js.org/docs/basics/Actions.html
import {
  axiosInstance
} from "../constants/ApiConfig.js";
import {
  INFORMATIONS,

  POST_CONNECT,
  POST_CONNECT_FULFILLED,
  POST_CONNECT_REJECTED
} from "../constants/ActionTypes";

export function dispatchInformations(payload) {
  return (dispatch, getState) => {
    axiosInstance.defaults.headers.common["X-API-Key"] = payload.API_Key;
    dispatch({
      type: INFORMATIONS,
      payload: payload
    });
  };
}

export function fetchConnection(payload) {
  return async (dispatch, getState) => {
    dispatch({
      type: POST_CONNECT
    });
    try {
      const informationData = await getState().information.informationData;

      const response = await axiosInstance({
        method: "post",
        url: "/customers/connect/",
        data: {
          mac_address: informationData.mac_address
        }
      });

      dispatch({
        type: POST_CONNECT_FULFILLED,
        payload: {
          establishment_type: "restaurant",
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
