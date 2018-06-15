// Reducers receive information from Actions in the form of "Type" and "Payload".
// And they perform a task or execute a fuction accordingly.

// For example, on receiving action type of "INCREMENT_NUM",
// the reducer function will increment the value stored in state, which is 0 initially.

// Read more on Reducers - https://redux.js.org/docs/basics/Reducers.html

import {
  INFORMATIONS,

  POST_CONNECT,
  POST_CONNECT_FULFILLED,
  POST_CONNECT_REJECTED
} from "../constants/ActionTypes";

const informationData = {
  mac_address: "",
  API_Key: "",
  token: "",
  auth_action: "",
  redir: "https://www.way-connect.com/",
  establishment_type: "",
  communicationURL: ""
};

export default function reducer(state = {
  informationData: { ...informationData
  },
  fetching: false,
  fetched: false
}, action) {
  switch (action.type) {
    case INFORMATIONS:
      return { ...state,
        informationData: { ...state.informationData,
          ...action.payload
        }
      };

    case POST_CONNECT:
      return { ...state,
        fetching: true,
        fetched: false
      };
    case POST_CONNECT_FULFILLED:
      return { ...state,
        fetching: false,
        fetched: true,
        informationData: { ...state.informationData,
          ...action.payload
        }
      };
    case POST_CONNECT_REJECTED:
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
