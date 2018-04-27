// This will can combine one or more Reducer functions and export it through Redux's combineReducer helper.
import { combineReducers } from "redux";

import count from "./counter";
import register from "./register";
import claim from "./claim";
// import secondCounter from './exampleReducer';

export default combineReducers({ count, register, claim });

// Example for combining multiple reducers:
// export default combineReducers({ count, secondCounter });
