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
  FETCH_DISCOUNT_REJECTED,

  FETCH_QUESTIONS,
  FETCH_QUESTIONS_FULFILLED,
  FETCH_QUESTIONS_REJECTED,

  POST_QUESTION,
  POST_QUESTION_FULFILLED,
  POST_QUESTION_REJECTED,

  UPDATE_QUESTION,
} from "../constants/ActionTypes";

const STATUS = require("../data/status");

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
        url: `/customers/${informationData.mac_address}/retrieve_discount/`,
        params: {}
      });
      const rate = Math.round(100 * response.data.current_views / response.data.promotion.max_views) / 100;
      const rewardString = `${response.data.promotion.reward} ${response.data.promotion.reward_currency}`;

      dispatch({
        type: FETCH_FIDELITY_FULFILLED,
        payload: {
          rate: rate,
          amount: Math.round(100 * rate * response.data.promotion.reward) / 100,
          reward: rewardString
        }
      });

      await dispatch(fetchDiscounts());
      await dispatch(fetchQuestions());

    } catch (error) {
      dispatch({
        type: FETCH_FIDELITY_REJECTED
      });
    }
  };
}

function fetchDiscounts(payload) {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_DISCOUNTS,
    });
    try {

      const informationData = { ...getState().information.informationData
      };
      const response = await axiosInstance({
        method: "get",
        url: `/customers/${informationData.mac_address}/discount_activations/`
      });

      dispatch({
        type: FETCH_DISCOUNTS_FULFILLED,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: FETCH_DISCOUNTS_REJECTED
      });
      throw new Error(error);
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
        url: `/customers/${informationData.mac_address}/activate_discount/`,
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
      dispatch(fetchFidelity());
      payload.toggleDiscountModal();
    }
  };
}

export function fetchQuestions(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: FETCH_QUESTIONS
      });
      const informationData = { ...getState().information.informationData
      };

      const hobbiesResponse = await axiosInstance({
        method: "get",
        url: "/customers/hobbies"
      });
      const hobbiesOptions = hobbiesResponse.data.map((item) => {
        return {
          "label": item.name,
          "value": item.id
        };
      });

      const response = await axiosInstance({
        method: "get",
        url: `/customers/${informationData.mac_address}/`
      });

      const customerState = { ...response.data
      };
      const questions = [{
        name: "date_of_birth",
        type: "date",
        title: "Birthday",
        answered: (customerState.date_of_birth === null ? false : true)
      }, {
        name: "country",
        type: "select-unique",
        title: "Nationality",
        options: STATUS["NATIONALITY"],
        answered: (customerState.country === "" ? false : true)
      }, {
        name: "relationship_status",
        type: "select-unique",
        title: "Relationship Status",
        options: STATUS["RELATIONSHIP"],
        answered: (customerState.relationship_status === null ? false : true)
      }, {
        name: "work_status",
        type: "select-unique",
        title: "Work Status",
        options: STATUS["PROFESSIONAL"],
        answered: (customerState.work_status === null ? false : true)
      }, {
        name: "hobbies",
        type: "select-multi",
        title: "Hobbies",
        options: STATUS["PROFESSIONAL"],
        answered: (customerState.hobbies.length === 0 ? false : true)
      }];

      const questionsSorted = questions.sort((a, b) => !a.answered && b.answered);
      const countAnswered = questionsSorted.filter((e) => e.answered).length;

      dispatch({
        type: FETCH_QUESTIONS_FULFILLED,
        payload: {
          questions: questionsSorted,
          id: countAnswered
        }
      });
    } catch (error) {
      dispatch({
        type: FETCH_QUESTIONS_REJECTED
      });
    }
  };
}

export function postQuestion(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: POST_QUESTION
      });
      const informationData = { ...getState().information.informationData
      };
      console.log(payload);
      const data = {
        [payload.name]: payload.answer
      };
      console.log("DAta: ", data);
      const response = await axiosInstance({
        method: "patch",
        url: `/customers/${informationData.mac_address}/`,
        data: data
      });

      dispatch({
        type: POST_QUESTION_FULFILLED
      });

    } catch (error) {
      dispatch({
        type: POST_QUESTION_REJECTED
      });
    }
  };
}

export function updateQuestion(payload) {
  return (dispatch, getState) => {
    let questions = [...getState().fidelity.questionsData.questions];
    const index = questions.findIndex(e => e.name === payload.name);
    questions[index].value = payload.value;
    dispatch({
      type: UPDATE_QUESTION,
      payload: questions
    });
  };
}
