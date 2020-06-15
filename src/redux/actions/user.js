import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {GET_USER, GET_USERS, REFRESH_USERS, CREATE_LIST} from '../constants';

const refreshUsers = addedGroupUser => ({
  type: REFRESH_USERS,
  addedGroupUser,
});

const getUser = user => ({
  type: GET_USER,
  user,
});

const getUsers = users => ({
  type: GET_USERS,
  users,
});

const addNewList = newList => ({
  type: CREATE_LIST,
  newList,
});

export const loginUserThunk = creds => {
  return axios
    .put('https://listthisbackend.herokuapp.com/api/auth/login', creds)
    .then(response => {
      return response.data;
    })
    .then(({token}) => AsyncStorage.setItem('token', token));
};

export const authorizeTokenThunk = () => {
  return dispatch => {
    return AsyncStorage.getItem('token')
      .then(token => {
        return axios.get(
          'https://listthisbackend.herokuapp.com/api/auth/login',
          {headers: {authorization: token}},
        );
      })
      .then(response => {
        return response.data;
      })
      .then(user => dispatch(getUser(user)));
  };
};

export const signUpThunk = credentials => {
  return dispatch => {
    return axios
      .post('https://listthisbackend.herokuapp.com/api/users', credentials)
      .then(res => res.data)
      .then(({token}) => {
        AsyncStorage.setItem('token', token);
      });
  };
};

export const createListThunk = (userId, listName) => {
  return dispatch => {
    return axios
      .post(
        `https://listthisbackend.herokuapp.com/api/users/${userId}/lists`,
        listName,
      )
      .then(res => res.data)
      .then(list => {
        dispatch(addNewList(list));
        return list;
      })
      .then(_list => dispatch(refreshUsers(_list.users[0])));
  };
};

export const getUsersThunk = () => {
  return dispatch => {
    return axios
      .get('https://listthisbackend.herokuapp.com/api/users')
      .then(res => res.data)
      .then(users => dispatch(getUsers(users)));
  };
};

export const listAddUserThunk = (userId, listId, username) => {
  return dispatch => {
    return axios
      .post(
        `https://listthisbackend.herokuapp.com/api/users/${userId}/lists/${listId}`,
        username,
      )
      .then(res => res.data)
      .then(user => dispatch(refreshUsers(user)));
  };
};
