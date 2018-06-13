// Reducers receive information from Actions in the form of "Type" and "Payload".
// And they perform a task or execute a fuction accordingly.

// For example, on receiving action type of "INCREMENT_NUM",
// the reducer function will increment the value stored in state, which is 0 initially.

// Read more on Reducers - https://redux.js.org/docs/basics/Reducers.html

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

const fidelityData = {
  fetching: false,
  fetched: false,
  rate: 0,
  reward: "",
};

const discountData = {
  fetching: false,
  fetched: false,
  code: "",
  reward: "",
  date: ""
};

const discountsData = {
  fetching: false,
  fetched: false,
  discounts: []
}

export default function reducer(state = {
  posting: false,
  posted: false,
  discountsData: { ...discountsData
  },
  fidelityData: { ...fidelityData
  },
  discountData: { ...discountData
  }
}, action) {
  switch (action.type) {
    case FETCH_FIDELITY:
      return { ...state,
        fidelityData: { ...state.fidelityData,
          fetching: true,
        }
      };
    case FETCH_FIDELITY_FULFILLED:
      return { ...state,
        fidelityData: { ...state.fidelityData,
          rate: action.payload.rate,
          reward: action.payload.reward,
          fetching: false,
          fetched: true,
        }
      };
    case FETCH_FIDELITY_REJECTED:
      return { ...state,
        fidelityData: { ...state.fidelityData,
          fetching: false,
          fetched: false,
        }
      };

    case FETCH_DISCOUNTS:
      return { ...state
      }
    case FETCH_DISCOUNTS_FULFILLED:
      return { ...state,
        discountsData: {
          discounts: action.payload,
          fetching: false,
          fetched: true
        }
      }
    case FETCH_DISCOUNTS_REJECTED:
      return { ...state,
        discountsData: {
          fetching: false,
          fetched: false
        }
      }

    case FETCH_DISCOUNT:
      return { ...state,
        discountData: { ...state.discountData,
          fetching: true
        }
      };
    case FETCH_DISCOUNT_FULFILLED:
      return { ...state,
        fidelityData: { ...state.fidelityData,
          rate: action.payload.rate
        },
        discountData: { ...state.discountData,
          code: action.payload.code,
          reward: action.payload.reward,
          date: action.payload.date,
          fetching: false,
          fetched: true,
        }
      };
    case FETCH_DISCOUNT_REJECTED:
      return { ...state,
        discountData: { ...state.discountData,
          fetching: false,
          fetched: false
        }
      };
    default:
      return { ...state
      };
  }

  return state;
}
