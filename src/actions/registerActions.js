// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store.

// Actions are triggered either by user through interactions or by an events, such as successful AJAX call.

// Read more on Actions - https://redux.js.org/docs/basics/Actions.html
import axios from "axios";
import {fetchInformation} from "./informationActions";
import {
  POST_REGISTER_FORM,
  POST_REGISTER_FORM_REJECTED,
  POST_REGISTER_FORM_FULFILLED
} from "../constants/ActionTypes";

export function postRegisterForm(payload) {
  return async (dispatch, getState) => {
    if (!getState().register.posting && !getState().register.posted) {
      dispatch({
        type: POST_REGISTER_FORM,
      })
      let userData = Object.assign({}, payload.userData);
      const informationData = getState().information.informationData
      userData.hobbies = userData.hobbies.map((item) => {
        return {
          "value": item.value
        }
      });

      delete userData.nationality;

      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:8000/customers/",
          headers: {
            "X-API-Key": informationData.API_Key
          },
          data: {
            ...userData,
            mac_address: informationData.mac_address
          }
        })
        dispatch({
          type: POST_REGISTER_FORM_FULFILLED
        })
        dispatch(fetchInformation())
      } catch (error) {
        dispatch({
          type: POST_REGISTER_FORM_REJECTED,
        })
        console.error(error);
      }
    }
  }
}
