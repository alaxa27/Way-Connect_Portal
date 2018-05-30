// Reducers receive information from Actions in the form of "Type" and "Payload".
// And they perform a task or execute a fuction accordingly.

// For example, on receiving action type of "INCREMENT_NUM",
// the reducer function will increment the value stored in state, which is 0 initially.

// Read more on Reducers - https://redux.js.org/docs/basics/Reducers.html

import {
  FETCH_INFORMATION,
  FETCH_INFORMATION_FULFILLED,
  FETCH_INFORMATION_REJECTED,
  POST_CONNECT,
  POST_CONNECT_FULFILLED,
  POST_CONNECT_REJECTED
} from "../constants/ActionTypes";
//c3bfc75db5134267956a673b65a7ad15
// 899f49e5e44d41a3ad8fe1a7368fd189
// mac_address: "01:00:5E:1A:2F:0E",
const informationData = {
  mac_address: "",
  API_Key: "",
  isHotel: false,
  isKnown: false,
  communicationURL: ""
};

export default function reducer(state = {
  informationData: {...informationData},
  fetching: false,
  fetched: false
}, action) {
  switch (action.type) {
    case FETCH_INFORMATION:
      return { ...state
      };
    case FETCH_INFORMATION_FULFILLED:
      return { ...state,
        fetching: false,
        fetched: true,
        informationData: {
          ...informationData,
          isKnown: action.payload.known,
          mac_address: action.payload.mac_address,
          isHotel: (action.payload.establishment_type === "hotel")
        }
      };
    case FETCH_INFORMATION_REJECTED:
      return { ...state,
        fetching: false,
        fetched: false
      };
    case POST_CONNECT:
      return { ...state
      };
    case POST_CONNECT_FULFILLED:
      return { ...state,
        informationData: { ...state.informationData,
          communicationURL: action.payload
        }
      };
    case POST_CONNECT_REJECTED:
      break;
    default:
      return { ...state
      };
  }

  return state;
}
