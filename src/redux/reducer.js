import {
  GET_USER,
  CREATE_LIST,
  GET_LISTS,
  GET_TASKS,
  CREATE_TASK,
  GET_USERS,
  COMPLETED_TASK,
  DELETE_TASK,
  REFRESH_USERS,
  UPDATE_LIST_NOTES,
  CREATE_TASKS,
  CREATE_LIST_TASKS,
  DELETE_LIST_TASK,
} from './constants';

export const usersReducer = (state = [], action) => {
  let refreshingUsers;

  if (action.addedListUser) {
    refreshingUsers = [...state].filter(
      user => user.id !== action.addedListUser.id,
    );
  }

  switch (action.type) {
    case GET_USERS:
      return action.users;

    case REFRESH_USERS:
      return [...refreshingUsers, action.addedListUser];

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

export const listsReducer = (state = [], action) => {
  let unchangedListNotes;
  let unchangedListUsers;
  let deletedListTask;

  if (action.updatedListNotes) {
    unchangedListNotes = [...state].filter(
      list => list.id !== action.updatedListNotes.id,
    );
  }

  if (action.deleteListTask) {
    deletedListTask = [...state].map(list => {
      const foundIndex = list.tasks.findIndex(
        task => task.id === action.deleteListTask.id,
      );

      if (foundIndex > -1) {
        list.tasks.splice(foundIndex, 1);
      }

      return list;
    });
  }

  switch (action.type) {
    case GET_LISTS:
      return action.lists;

    case CREATE_LIST:
      return [...state, action.newList];

    case UPDATE_LIST_NOTES:
      return [...unchangedListNotes, action.updatedListNotes];

    case DELETE_LIST_TASK:
      return deletedListTask;

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

    case CREATE_LIST_TASKS:
      return [...state, ...action.newListTasks];

    case CREATE_TASKS:
      return [...state, ...action.newTasks];

    default:
      return state;
  }
};
