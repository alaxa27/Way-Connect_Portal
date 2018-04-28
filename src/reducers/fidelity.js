// Reducers receive information from Actions in the form of "Type" and "Payload".
// And they perform a task or execute a fuction accordingly.

// For example, on receiving action type of "INCREMENT_NUM",
// the reducer function will increment the value stored in state, which is 0 initially.

// Read more on Reducers - https://redux.js.org/docs/basics/Reducers.html

import {
  FETCH_FIDELITY,
  FETCH_FIDELITY_FULFILLED,
  FETCH_FIDELITY_REJECTED,
  FETCH_DISCOUNT,
  FETCH_DISCOUNT_FULFILLED,
  FETCH_DISCOUNT_REJECTED
} from "../constants/ActionTypes";

const fidelity = {
  mac: "01:00:5E:1A:2F:0E",
  rate: 0,
}

export default function reducer(state = {
  posting: false,
  posted: false,
  fetching: false,
  fetched: false,
  fidelityData: fidelity
}, action) {
  switch (action.type) {
    case FETCH_FIDELITY:
      return { ...state,
        fetching: true
      };
    case FETCH_FIDELITY_FULFILLED:
      return { ...state,
        fetching: false,
        fetched: true,
        fidelityData: action.payload
      };
    case FETCH_FIDELITY_REJECTED:
      return { ...state,
        fetching: false,
        fetched: false
      };
    case FETCH_DISCOUNT:
      return { ...state,
        fetching: true
      };
    case FETCH_DISCOUNT_FULFILLED:
      return { ...state,
        fetching: false,
        fetched: true,
        fidelityData: action.payload
      };
    case FETCH_DISCOUNT_REJECTED:
      return { ...state,
        fetching: false,
        fetched: false
      };
    default:
      return { ...state
      };
  }

  return state;
}
