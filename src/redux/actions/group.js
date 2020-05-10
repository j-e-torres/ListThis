import axios from 'axios';
import {CREATE_LIST, GET_GROUP_LISTS} from '../constants';

const getGroupLists = lists => ({
  type: GET_GROUP_LISTS,
  lists,
});

const addNewList = newList => ({
  type: CREATE_LIST,
  newList,
});

export const groupListsThunk = groupId => {
  return dispatch => {
    return axios
      .get(`https://listthisbackend.herokuapp.com/api/groups/${groupId}/lists`)
      .then(res => res.data)
      .then(lists => dispatch(getGroupLists(lists)));
  };
};

export const createListThunk = (groupId, newList) => {
  return dispatch => {
    return axios
      .post(
        `https://listthisbackend.herokuapp.com/api/groups/${groupId}/lists`,
        newList,
      )
      .then(res => res.data)
      .then(list => dispatch(addNewList(list)));
  };
};
