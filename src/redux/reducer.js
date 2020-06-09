import {
  GET_USER,
  CREATE_GROUP,
  CREATE_LIST,
  GET_LISTS,
  GET_TASKS,
  CREATE_TASK,
  GET_GROUPS,
  ADD_USER,
  GET_USERS,
  COMPLETED_TASK,
  DELETE_TASK,
  REFRESH_USERS,
  UPDATE_LIST_NOTES,
} from './constants';

export const usersReducer = (state = [], action) => {
  let refreshingUsers;

  if (action.addedGroupUser) {
    refreshingUsers = [...state].filter(
      user => user.id !== action.addedGroupUser.id,
    );
  }

  switch (action.type) {
    case GET_USERS:
      return action.users;

    case ADD_USER:
      return [...state, action.newUser];

    case REFRESH_USERS:
      return [...refreshingUsers, action.addedGroupUser];

    default:
      return state;
  }
};

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;

    default:
      return state;
  }
};

export const groupsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_GROUPS:
      return action.groups;

    case CREATE_GROUP:
      return [...state, action.newGroup];

    default:
      return state;
  }
};

export const listsReducer = (state = [], action) => {
  let nonUpdatedLists;

  if (action.updatedListNotes) {
    nonUpdatedLists = [...state].filter(
      list => list.id !== action.updatedListNotes.id,
    );
  }

  switch (action.type) {
    case GET_LISTS:
      return action.lists;

    case CREATE_LIST:
      return [...state, action.newList];

    case UPDATE_LIST_NOTES:
      return [...nonUpdatedLists, action.updatedListNotes];

    default:
      return state;
  }
};

export const tasksReducer = (state = [], action) => {
  let uncompletedTasks;
  let remainingTasks;

  if (action.completedTask) {
    uncompletedTasks = [...state].filter(
      task => task.taskName !== action.completedTask.taskName,
    );
  }

  if (action.deletedTask) {
    remainingTasks = [...state].filter(
      task => task.id !== action.deletedTask.id,
    );
  }

  switch (action.type) {
    case GET_TASKS:
      return action.tasks;

    case CREATE_TASK:
      return [...state, action.newTask];

    case COMPLETED_TASK:
      return [...uncompletedTasks, action.completedTask];

    case DELETE_TASK:
      return [...remainingTasks];

    default:
      return state;
  }
};
