import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {loginReducer} from './reducer';

const reducer = combineReducers({
  userLogin: loginReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
