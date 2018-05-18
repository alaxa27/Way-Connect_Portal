// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store.

// Actions are triggered either by user through interactions or by an events, such as successful AJAX call.

// Read more on Actions - https://redux.js.org/docs/basics/Actions.html
import axios from "axios";

import { axiosInstance } from "../constants/ApiConfig.js";
import {
  POST_CLAIM,
  POST_CLAIM_FULFILLED,
  POST_CLAIM_REJECTED
} from "../constants/ActionTypes";

export function postClaim(payload) {
  return async (dispatch, getState) => {
    if (!getState().claim.posting) {
      dispatch({
        type: POST_CLAIM
      });
      try {
        const informationData = {
          ...getState().information.informationData
        };
        const claimData = {
          ...getState().claim.claimData
        };
        const response = await axiosInstance({
          method: "post",
          url: `/customers/claim/`,
          data: {
            ...claimData,
            mac_address: informationData.mac_address
          }
        });

        dispatch({
          type: POST_CLAIM_FULFILLED,
          payload: response.data.video
        });

      } catch (error) {
        dispatch({
          type: POST_CLAIM_REJECTED
        });
        console.error(error);
      }
    }
  };
}
