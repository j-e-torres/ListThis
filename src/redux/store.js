import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {loginReducer, userGroupsReducer, groupListsReducer} from './reducer';

const reducer = combineReducers({
  userLogin: loginReducer,
  userGroups: userGroupsReducer,
  groupLists: groupListsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
