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

import i18n from "../constants/i18n";

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
      const slope = 0.1;
      let rate = Math.log((slope + response.data.current_progress) / slope) / Math.log((1 + slope) / slope);
      rate = Math.round(100 * rate) / 100;
    const rewardString = `${response.data.promotion_level.reward} ${response.data.promotion_level.reward_currency}`;
    const amount = Math.round(100 * rate * response.data.promotion_level.reward) / 100;

    dispatch({
      type: FETCH_FIDELITY_FULFILLED,
      payload: {
        level: response.data.promotion_level.rank,
        rate: rate,
        amount: amount,
        reward: rewardString,
        text: response.data.promotion_level.text
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
    if (!getState().fidelity.fidelityData.fetching && !getState().fidelity.discountData.fetched && getState().fidelity.fidelityData.rate === 1) {
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
        type: "radio",
        options: STATUS["GENDER"],
        name: "gender",
        title: i18n.t("fidelity.profile.titles.gender"),
        icon: "transgender",
        answered: (customerState.gender === null ? false : true)
      }, {
        type: "date",
        name: "date_of_birth",
        title: i18n.t("fidelity.profile.titles.date_of_birth"),
        icon: "birthday-cake",
        answered: (customerState.date_of_birth === null ? false : true)
      }, {
        type: "select-unique",
        options: STATUS["NATIONALITY"],
        name: "country",
        title: i18n.t("fidelity.profile.titles.country"),
        icon: "globe-africa",
        answered: (customerState.country === "" ? false : true)
      }, {
        type: "select-unique",
        options: STATUS["RELATIONSHIP"],
        name: "relationship_status",
        title: i18n.t("fidelity.profile.titles.relationship_status"),
        icon: "heart",
        answered: (customerState.relationship_status === null ? false : true)
      }, {
        type: "select-unique",
        options: STATUS["PROFESSIONAL"],
        name: "work_status",
        title: i18n.t("fidelity.profile.titles.work_status"),
        icon: "briefcase",
        answered: (customerState.work_status === null ? false : true)
      }, {
        type: "select-multi",
        options: hobbiesOptions,
        name: "hobbies",
        title: i18n.t("fidelity.profile.titles.hobbies"),
        icon: "futbol",
        answered: (customerState.hobbies.length === 0 ? false : true)
      }];

      const questionsSorted = questions.sort((a, b) => !a.answered && b.answered ? 1 : -1);
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

      const response = await axiosInstance({
        method: "patch",
        url: `/customers/${informationData.mac_address}/`,
        data: {
          [payload.name]: payload.answer
        }
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
