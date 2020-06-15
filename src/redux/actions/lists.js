import axios from 'axios';
import {GET_LISTS, UPDATE_LIST_NOTES} from '../constants';

const getLists = lists => ({
  type: GET_LISTS,
  lists,
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

export const updateListNotesThunk = (listId, listNotes) => {
  return dispatch => {
    return axios
      .put(
        `https://listthisbackend.herokuapp.com/api/lists/${listId}/notes`,
        listNotes,
      )
      .then(res => {
        return res.data;
      })
      .then(list => dispatch(updateListNotes(list)));
  };
};
