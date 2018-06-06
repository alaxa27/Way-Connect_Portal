// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store.

// Actions are triggered either by user through interactions or by an events, such as successful AJAX call.

// Read more on Actions - https://redux.js.org/docs/basics/Actions.html
import axios from "axios";

import {
  axiosInstance
} from "../constants/ApiConfig.js";
import {
  FETCH_REGISTER_DATA,
  FETCH_REGISTER_DATA_FULFILLED,
  FETCH_REGISTER_DATA_REJECTED,
  POST_REGISTER_FORM,
  POST_REGISTER_FORM_FULFILLED,
  POST_REGISTER_FORM_REJECTED
} from "../constants/ActionTypes";

import {
  fetchInformation
} from "./informationActions";

export function fetchRegisterData(payload) {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_REGISTER_DATA
    });
    try {
      const registerData = { ...getState().register.registerData
      };
      const response = await axiosInstance({
        method: "get",
        url: "/customers/hobbies/",
      });
      // registerData.hobbies = response.data
      registerData.hobbies = response.data.map((item) => {
        return {
          "label": item.name,
          "value": item.id
        };
      });
      dispatch({
        type: FETCH_REGISTER_DATA_FULFILLED,
        payload: registerData
      });
    } catch (error) {
      dispatch({
        type: FETCH_REGISTER_DATA_REJECTED
      });
      console.error(error);
    }
  };
}

export function postRegisterForm(payload) {
  return async (dispatch, getState) => {
    if (!getState().register.posting && !getState().register.posted) {
      dispatch({
        type: POST_REGISTER_FORM,
      });
      let userData = { ...payload
      };
      console.log("USERDATA", userData);
      const informationData = { ...getState().information.informationData
      };
      userData.hobbies = userData.hobbies.map((item) => {
        return item.value;
      });

      userData.country = userData.nationality;
      delete userData.nationality;

      try {
        const response = await axiosInstance({
          method: "post",
          url: "/customers/register/",
          data: {
            ...userData,
            mac_address: informationData.mac_address
          }
        });
        dispatch({
          type: POST_REGISTER_FORM_FULFILLED
        });
        dispatch(fetchInformation({
          mac_address: informationData.mac_address
        }));
      } catch (error) {
        dispatch({
          type: POST_REGISTER_FORM_REJECTED,
        });
        console.error(error);
      }
    }
  };
}
