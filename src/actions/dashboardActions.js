// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store.

// Actions are triggered either by user through interactions or by an events, such as successful AJAX call.

// Read more on Actions - https://redux.js.org/docs/basics/Actions.html
import {
  axiosInstance
} from "../constants/ApiConfig.js";

import {
  ACKNOWLEDGE_COMMUNICATION,
  ACKNOWLEDGE_COMMUNICATION_FULFILLED,
  ACKNOWLEDGE_COMMUNICATION_REJECTED
} from "../constants/ActionTypes";

export function acknowledgeCommunication(payload) {
  return async (dispatch, getState) => {
    dispatch({
      type: ACKNOWLEDGE_COMMUNICATION
    });
    try {
      const informationData = { ...getState().information.informationData
      };
      const response = await axiosInstance({
        method: "post",
        url: "/customers/acknowledge_communication/",
        data: {
          mac_address: informationData.mac_address
        }
      });

      //payload.history.push("/video");
      dispatch({
        type: ACKNOWLEDGE_COMMUNICATION_FULFILLED,
      });

      const response1 = await axios.get({
        method: "get",
        url: "http://192.168.220.2:2050/nodogsplash_auth/",
        params: {
          tok: informationData.token
        }
      });

      // window.location.href = `http://192.168.220.2:2050/nodogsplash_auth/?tok=${informationData.token}`;

    } catch (error) {
      dispatch({
        type: ACKNOWLEDGE_COMMUNICATION_REJECTED
      });
    }
  };
}
