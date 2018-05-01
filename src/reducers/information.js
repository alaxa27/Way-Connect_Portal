// Reducers receive information from Actions in the form of "Type" and "Payload".
// And they perform a task or execute a fuction accordingly.

// For example, on receiving action type of "INCREMENT_NUM",
// the reducer function will increment the value stored in state, which is 0 initially.

// Read more on Reducers - https://redux.js.org/docs/basics/Reducers.html

import {

  FETCH_INFORMATION,
  FETCH_INFORMATION_FULFILLED,
  FETCH_INFORMATION_REJECTED
} from "../constants/ActionTypes";

// mac_address: "01:00:5E:1A:2F:0E",
const informationData = {
  mac_address: "00:DF:1D:E2:8A:1D",
  isHotel: false,
  isKnown: false
}

export default function reducer(state = {
  informationData: informationData,
  fetching: false,
  fetched: false
}, action) {
  switch (action.type) {
    case FETCH_INFORMATION:
      return { ...state
      }
    case FETCH_INFORMATION_FULFILLED:
      state.informationData.isKnown = action.payload
      return { ...state,
        fetching: false,
        fetched: true
      }
    case FETCH_INFORMATION_REJECTED:
      return { ...state,
        fetching: false,
        fetched: false
      }
    default:
      return { ...state
      }
  }

  return state;
}
