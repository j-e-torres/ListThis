import axios from 'axios';
import {CREATE_LIST, GET_LISTS, UPDATE_LIST_NOTES} from '../constants';

const getLists = lists => ({
  type: GET_LISTS,
  lists,
});

const addNewList = newList => ({
  type: CREATE_LIST,
  newList,
});

const updateListNotes = updatedListNotes => ({
  type: UPDATE_LIST_NOTES,
  updatedListNotes,
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

export const updateListNotesThunk = (listId, listNotes) => {
  return dispatch => {
    return axios
      .put(
        `https://listthisbackend.herokuapp.com/api/list/${listId}/notes`,
        listNotes,
      )
      .then(res => res.data)
      .then(list => dispatch(updateListNotes(list)));
  };
};
