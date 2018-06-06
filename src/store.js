import {applyMiddleware, createStore} from "redux";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reduxMiddleware from "react-block-ui/reduxMiddleware";


import reducer from "./reducers";

const middleware = applyMiddleware(promise(), thunk, createLogger(), reduxMiddleware);

export default createStore(reducer, middleware);
