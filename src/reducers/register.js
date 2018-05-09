// Reducers receive information from Actions in the form of "Type" and "Payload".
// And they perform a task or execute a fuction accordingly.

// For example, on receiving action type of "INCREMENT_NUM",
// the reducer function will increment the value stored in state, which is 0 initially.

// Read more on Reducers - https://redux.js.org/docs/basics/Reducers.html

import {
  FETCH_REGISTER_DATA,
  FETCH_REGISTER_DATA_FULFILLED,
  FETCH_REGISTER_DATA_REJECTED,
  POST_REGISTER_FORM,
  POST_REGISTER_FORM_FULFILLED,
  POST_REGISTER_FORM_REJECTED
} from "../constants/ActionTypes";

const userData = {
  age: 5,
  gender: "M",
  nationality: "",
  work_status: "",
  relationship_status: "",
  hobbies: []
}

const registerData = {
  hobbies: []
}

export default function reducer(state = {
  posting: false,
  posted: false,
  fetching: false,
  fetched: false,
  userData: {...userData},
  registerData: {...registerData}
}, action) {
  switch (action.type) {
    case FETCH_REGISTER_DATA:
      return {...state, fetching: true}
    case FETCH_REGISTER_DATA_FULFILLED:
      return {...state, fetching: false, fetched: true, registerData: action.payload}
    case FETCH_REGISTER_DATA_REJECTED:
      return {...state, fetching: false, fetched: false}
    case POST_REGISTER_FORM:
      return { ...state,
        posting: true
      };
    case POST_REGISTER_FORM_FULFILLED:
      return { ...state,
        posting: false,
        posted: true
      };
    case POST_REGISTER_FORM_REJECTED:
      return { ...state,
        posting: false,
        posted: false
      };
    default:
      return { ...state
      };
  }

  return state;
}
