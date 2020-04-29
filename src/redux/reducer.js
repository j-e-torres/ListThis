import {GET_USER, GET_USER_GROUPS} from './constants';

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
    default:
      return state;
  }
};
