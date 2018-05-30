// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store.

// Actions are triggered either by user through interactions or by an events, such as successful AJAX call.

// Read more on Actions - https://redux.js.org/docs/basics/Actions.html
import {
  axiosInstance
} from "../constants/ApiConfig.js";

import {
  FETCH_FIDELITY,
  FETCH_FIDELITY_FULFILLED,
  FETCH_FIDELITY_REJECTED,
  FETCH_DISCOUNT,
  FETCH_DISCOUNT_FULFILLED,
  FETCH_DISCOUNT_REJECTED
} from "../constants/ActionTypes";

export function fetchFidelity(payload) {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_FIDELITY,
    });
    setTimeout(function() {
      dispatch({
        type: FETCH_FIDELITY_FULFILLED,
        payload: {
          rate: 0.8
        }
      });
    }, 2000);
  };
}

export function fetchDiscount(payload) {
  return async (dispatch, getState) => {
    if (!getState().fidelity.fidelityData.fetching && !getState().fidelity.discountData.fetched && getState().fidelity.fidelityData.rate > 0) {
      dispatch({
        type: FETCH_DISCOUNT
      });
      const informationData = { ...getState().information.informationData
      };
      const response = await axiosInstance({
        method: "post",
        url: "/customers/activate_discount/",
        data: {
          mac_address: informationData.mac_address
        }
      });
      let discountData = { ...getState().fidelity.discountData
      };
      dispatch({
        type: FETCH_DISCOUNT_FULFILLED,
        payload: {
          rate: 0,
          code: response.data.code,
          reward: `${response.data.reward} ${response.data.reward_currency}`
        }
      });
      payload.toggleDiscountModal();
    }
  };
}
