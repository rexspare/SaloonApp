import {combineReducers} from 'redux';
import authReducer from './AuthReducer';
import appReducer from './AppReducer';

var reducers = combineReducers({
    authReducer, appReducer
  });
  
  export default rootReducer = (state, action) => {

    return reducers(state, action);
  };