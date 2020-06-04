import axios from 'axios';
import {CREATE_LIST, GET_LISTS} from '../constants';

const getLists = lists => ({
  type: GET_LISTS,
  lists,
});

const addNewList = newList => ({
  type: CREATE_LIST,
  newList,
});

export const getListsThunk = () => {
  return dispatch => {
    return axios
      .get('https://listthisbackend.herokuapp.com/api/lists')
      .then(res => res.data)
      .then(lists => dispatch(getLists(lists)));
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
