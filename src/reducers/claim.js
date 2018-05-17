// Reducers receive information from Actions in the form of "Type" and "Payload".
// And they perform a task or execute a fuction accordingly.

// For example, on receiving action type of "INCREMENT_NUM",
// the reducer function will increment the value stored in state, which is 0 initially.

// Read more on Reducers - https://redux.js.org/docs/basics/Reducers.html

import {
  POST_CLAIM,
  POST_CLAIM_FULFILLED,
  POST_CLAIM_REJECTED,
  POST_CLAIM_REDIRECTED
} from "../constants/ActionTypes";

const claim = {
  email: "",
  name: "",
  content: ""
};

export default function reducer(state = {
  posting: false,
  posted: false,
  claimData: {...claim}
}, action) {
  switch (action.type) {
    case POST_CLAIM:
      return { ...state,
        posting: true
      };
    case POST_CLAIM_FULFILLED:
      return { ...state,
        claimData: { ...claim
        },
        posting: false,
        posted: true
      };
    case POST_CLAIM_REJECTED:
      return { ...state,
        posting: false,
        posted: false
      };
    case POST_CLAIM_REDIRECTED:
      return { ...state,
        posted: false};
    default:
      return { ...state
      };
  }

  return state;
}
