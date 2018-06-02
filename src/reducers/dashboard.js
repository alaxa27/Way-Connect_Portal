// Reducers receive information from Actions in the form of "Type" and "Payload".
// And they perform a task or execute a fuction accordingly.

// For example, on receiving action type of "INCREMENT_NUM",
// the reducer function will increment the value stored in state, which is 0 initially.

// Read more on Reducers - https://redux.js.org/docs/basics/Reducers.html

import {
  ACKNOWLEDGE_COMMUNICATION,
  ACKNOWLEDGE_COMMUNICATION_FULFILLED,
  ACKNOWLEDGE_COMMUNICATION_REJECTED
} from "../constants/ActionTypes";

export default function reducer(state = {
  acknowledging: false,
  acknowledged: false
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
    default:
      return { ...state
      };
  }

  return state;
}
