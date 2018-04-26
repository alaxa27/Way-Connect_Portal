// Reducers receive information from Actions in the form of "Type" and "Payload".
// And they perform a task or execute a fuction accordingly.

// For example, on receiving action type of "INCREMENT_NUM",
// the reducer function will increment the value stored in state, which is 0 initially.

// Read more on Reducers - https://redux.js.org/docs/basics/Reducers.html

import { POST_REGISTER_FORM } from "../constants/ActionTypes";

export default function reducer(state = {
age: 5,
gender: 'male',
professional: '',
relationship: ''
}, action) {
  switch (action.type) {
  case POST_REGISTER_FORM:
    return {...state, action.payload};
  case default:
    return {...state};
  }

  return state;
}
