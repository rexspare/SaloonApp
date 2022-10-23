import {createStore, applyMiddleware} from 'redux';
// import { composeWithDevTools } from "redux-devtools-extension";

// Logger with default options
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './Reducers/index';

export default function configureStore(initialState) {
  var store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk),
  );

  return store;
}
