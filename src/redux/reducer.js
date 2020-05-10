import {
  GET_USER,
  GET_USER_GROUPS,
  CREATE_GROUP,
  CREATE_LIST,
  GET_GROUP_LISTS,
} from './constants';

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;

    default:
      return state;
  }
};

export const userGroupsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_GROUPS:
      return action.groups;

    case CREATE_GROUP:
      return [...state, action.newGroup];

    default:
      return state;
  }
};

export const groupListsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_GROUP_LISTS:
      return action.lists;

    case CREATE_LIST:
      return [...state, action.newList];

    default:
      return state;
  }
};
