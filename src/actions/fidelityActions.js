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

  FETCH_DISCOUNTS,
  FETCH_DISCOUNTS_FULFILLED,
  FETCH_DISCOUNTS_REJECTED,

  FETCH_DISCOUNT,
  FETCH_DISCOUNT_FULFILLED,
  FETCH_DISCOUNT_REJECTED
} from "../constants/ActionTypes";

export function fetchFidelity(payload) {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_FIDELITY,
    });
    try {
      const informationData = { ...getState().information.informationData
      };
      const response = await axiosInstance({
        method: "get",
        url: "/customers/retrieve_discount/",
        params: {
          mac_address: informationData.mac_address
        }
      });
      const rate = Math.round(100 * response.data.current_views / response.data.promotion.max_views) / 100;
      const rewardString = `${response.data.promotion.reward} ${response.data.promotion.reward_currency}`;

      dispatch({
        type: FETCH_FIDELITY_FULFILLED,
        payload: {
          rate: rate,
          reward: rewardString
        }
      });

      await dispatch(fetchDiscounts());

    } catch (error) {
      dispatch({
        type: FETCH_FIDELITY_REJECTED
      })
    }
  };
}

function fetchDiscounts(payload) {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_DISCOUNTS,
    });
    try {

      const discounts = [
        {
        "code": "937c15",
        "reward": "7.02",
        "reward_currency": "EUR",
        "views": 3,
        "date": "2018-05-20T20:35:36.008158Z",
        "discount": 146
      }, {
        "code": "c0d01e",
        "reward": "37.43",
        "reward_currency": "EUR",
        "views": 16,
        "date": "2018-05-20T20:35:36.069622Z",
        "discount": 148
      }, {
        "code": "4f99dd",
        "reward": "11.70",
        "reward_currency": "EUR",
        "views": 5,
        "date": "2018-05-20T20:35:36.050409Z",
        "discount": 148
      }, {
        "code": "123940",
        "reward": "28.07",
        "reward_currency": "EUR",
        "views": 12,
        "date": "2018-05-20T20:35:36.144615Z",
        "discount": 152
      }, {
        "code": "45c5bc",
        "reward": "2.34",
        "reward_currency": "EUR",
        "views": 1,
        "date": "2018-05-20T20:35:36.126723Z",
        "discount": 152
      }
    ];

      // const informationData = { ...getState().information.informationData
      // };
      // const response = await axiosInstance({
      //   method: "get",
      //   url: "/customers/discount_activations/",
      //   params: {
      //     mac_address: informationData.mac_address
      //   }
      // });

      dispatch({
        type: FETCH_DISCOUNTS_FULFILLED,
        payload: discounts
      });
    } catch (error) {
      dispatch({
        type: FETCH_DISCOUNTS_REJECTED
      })
      throw new Error(error)
    }
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
          reward: `${response.data.reward} ${response.data.reward_currency}`,
          date: response.data.date
        }
      });
      payload.toggleDiscountModal();
    }
  };
}
