// This will can combine one or more Reducer functions and export it through Redux's combineReducer helper.
import { combineReducers } from "redux";

import gateway from "./gateway";
import register from "./register";
import claim from "./claim";
import fidelity from "./fidelity";
import information from "./information";

export default combineReducers({ gateway, register, claim, fidelity, information });
