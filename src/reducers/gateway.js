// Reducers receive information from Actions in the form of "Type" and "Payload".
// And they perform a task or execute a fuction accordingly.

// For example, on receiving action type of "INCREMENT_NUM",
// the reducer function will increment the value stored in state, which is 0 initially.

// Read more on Reducers - https://redux.js.org/docs/basics/Reducers.html

import {
  ACKNOWLEDGE_COMMUNICATION,
  ACKNOWLEDGE_COMMUNICATION_FULFILLED,
  ACKNOWLEDGE_COMMUNICATION_REJECTED,

  FETCH_ESTABLISHMENT,
  FETCH_ESTABLISHMENT_FULFILLED,
  FETCH_ESTABLISHMENT_REJECTED
} from "../constants/ActionTypes";

const establishmentData = {
  fetching: false,
  fetched: false,
  name: "",
  picture: "",
  background_color: "black"
};

export default function reducer(state = {
  acknowledging: false,
  acknowledged: false,
  establishmentData: establishmentData
}, action) {
  switch (action.type) {
    case ACKNOWLEDGE_COMMUNICATION:
      return { ...state,
        acknowledging: true,
        acknowledged: false,
      };
    case ACKNOWLEDGE_COMMUNICATION_FULFILLED:
      return { ...state,
        acknowledging: false,
        acknowledged: true
      };
    case ACKNOWLEDGE_COMMUNICATION_REJECTED:
      return { ...state,
        acknowledging: false,
        acknowledged: false
      };

    case FETCH_ESTABLISHMENT:
      return { ...state,
        establishmentData: {
          ...state.establishmentData,
          fetching: true,
        }
      };
    case FETCH_ESTABLISHMENT_FULFILLED:
      return { ...state,
        establishmentData: {
          ...state.establishmentData,
          ...action.payload,
          fetching: false,
          fetched: true
        }
      };
    case FETCH_ESTABLISHMENT_REJECTED:
      return { ...state,
        establishmentData: {
          ...state.establishmentData,
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
