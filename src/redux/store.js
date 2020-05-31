import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {
  loginReducer,
  groupsReducer,
  listsReducer,
  tasksReducer,
  usersReducer,
} from './reducer';

const reducer = combineReducers({
  userLogin: loginReducer,
  groups: groupsReducer,
  lists: listsReducer,
  tasks: tasksReducer,
  users: usersReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
