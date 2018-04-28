// Reducers receive information from Actions in the form of "Type" and "Payload".
// And they perform a task or execute a fuction accordingly.

// For example, on receiving action type of "INCREMENT_NUM",
// the reducer function will increment the value stored in state, which is 0 initially.

// Read more on Reducers - https://redux.js.org/docs/basics/Reducers.html

// import {} from "../constants/ActionTypes";

const information = {
  mac: "01:00:5E:1A:2F:0E",
  isHotel: false
}

export default function reducer(state = information, action) {
  switch (action.type) {
    default:
      return { ...state
      }
  }

  return state;
}
