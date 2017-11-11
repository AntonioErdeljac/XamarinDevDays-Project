import {createStore, applyMiddleware, combineReducers} from "redux";
import {promiseMiddleware} from "./middleware";

//store kao zasebna datoteka radi preglednosti, spaja sve reducere, primjenjuje Middlewareove

import speakers from "./reducers/speakers";


const reducer = combineReducers({
    speakers
});

const store = createStore(reducer, applyMiddleware(promiseMiddleware));

export default store;