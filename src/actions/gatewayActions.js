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
  ACKNOWLEDGE_COMMUNICATION_REJECTED,

  CLICK_COMMUNICATION,
  CLICK_COMMUNICATION_FULFILLED,
  CLICK_COMMUNICATION_REJECTED,

  FETCH_ESTABLISHMENT,
  FETCH_ESTABLISHMENT_FULFILLED,
  FETCH_ESTABLISHMENT_REJECTED,
} from "../constants/ActionTypes";

export function fetchEstablishment(payload) {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_ESTABLISHMENT
    });
    try {
      const informationData = { ...getState().information.informationData
      };
      const response = await axiosInstance({
        method: "get",
        url: "/customers/establishment/",
      });

      dispatch({
        type: FETCH_ESTABLISHMENT_FULFILLED,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_ESTABLISHMENT_REJECTED
      });
    }
  };
}

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
        url: `/customers/${informationData.mac_address}/acknowledge_communication/`,
        data: {}
      });

      dispatch({
        type: ACKNOWLEDGE_COMMUNICATION_FULFILLED,
      });
      // payload.history.push("/dashboard");

      // window.location.href = `http://192.168.220.2:2050/nodogsplash_auth/?tok=${informationData.token}&redir=${informationData.redir}`;

    } catch (error) {
      dispatch({
        type: ACKNOWLEDGE_COMMUNICATION_REJECTED
      });
    }
  };
}

export function clickCommunication(payload) {
  return async (dispatch, getState) => {
    dispatch({
      type: CLICK_COMMUNICATION
    });
    try {
      const informationData = { ...getState().information.informationData
      };
      const response = await axiosInstance({
        method: "post",
        url: `/customers/${informationData.mac_address}/click_communication/`,
        data: {}
      });

      var tempLink = document.createElement("a");
      tempLink.style.display = "none";
      tempLink.href = informationData.redirection;
      tempLink.click();
      payload.history.push("/dashboard");
      document.body.removeChild(tempLink);

      dispatch({
        type: CLICK_COMMUNICATION_FULFILLED,
      });


      // window.location.href = `http://192.168.220.2:2050/nodogsplash_auth/?tok=${informationData.token}&redir=${informationData.redir}`;

    } catch (error) {
      dispatch({
        type: CLICK_COMMUNICATION_REJECTED
      });
    }
  };
}
