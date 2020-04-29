import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {loginReducer, userGroupsReducer} from './reducer';

const reducer = combineReducers({
  userLogin: loginReducer,
  userGroups: userGroupsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
