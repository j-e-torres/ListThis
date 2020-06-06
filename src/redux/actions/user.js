import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  GET_USER,
  CREATE_GROUP,
  ADD_USER,
  GET_USERS,
  REFRESH_USERS,
} from '../constants';

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

const addUser = newUser => ({
  type: ADD_USER,
  newUser,
});

const addNewGroup = newGroup => ({
  type: CREATE_GROUP,
  newGroup,
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

export const createGroupThunk = (userId, groupName) => {
  return dispatch => {
    return axios
      .post(
        `https://listthisbackend.herokuapp.com/api/users/${userId}/groups`,
        groupName,
      )
      .then(res => res.data)
      .then(group => {
        dispatch(addNewGroup(group));
        return group;
      })
      .then(_group => dispatch(refreshUsers(_group.users[0])));
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

export const groupAddUserThunk = (userId, groupId, username) => {
  return dispatch => {
    return axios
      .post(
        `https://listthisbackend.herokuapp.com/api/users/${userId}/groups/${groupId}`,
        username,
      )
      .then(res => res.data)
      .then(user => dispatch(refreshUsers(user)));
  };
};
