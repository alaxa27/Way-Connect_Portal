// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store.

// Actions are triggered either by user through interactions or by an events, such as successful AJAX call.

// Read more on Actions - https://redux.js.org/docs/basics/Actions.html
import {
  axiosInstance
} from "../constants/ApiConfig.js";
import {
  POST_CONNECT,
  POST_CONNECT_FULFILLED,
  POST_CONNECT_REJECTED
} from "../constants/ActionTypes";

export function fetchConnection(payload) {
  return async (dispatch, getState) => {

    const informationData = await getState().information.informationData;
    axiosInstance.defaults.headers.common["X-API-Key"] = informationData.API_Key;

    dispatch({
      type: POST_CONNECT
    });
    try {
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
