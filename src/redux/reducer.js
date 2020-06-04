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
} from './constants';

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;

    case ADD_USER:
      return [...state, action.newUser];

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
  switch (action.type) {
    case GET_LISTS:
      return action.lists;

    case CREATE_LIST:
      return [...state, action.newList];

    default:
      return state;
  }
};

export const tasksReducer = (state = [], action) => {
  // console.log('taskReducer, action.completedTask', action);
  let remainingTasks;

  if (action.completedTask) {
    remainingTasks = [...state].filter(
      task => task.taskName !== action.completedTask.taskName,
    );
  }

  console.log('taskreducaer, completedtasks', remainingTasks);
  // [...state, action.completedTask]

  // const completedTasks = [...state].reduce((acc, task) => {
  //   if (task.taskName === action.completedTask.taskName) {
  //     acc.push(action.completedTask);
  //   } else {
  //     acc.push(task);
  //   }

  //   return acc;
  // }, []);

  switch (action.type) {
    case GET_TASKS:
      return action.tasks;

    case CREATE_TASK:
      return [...state, action.newTask];

    case COMPLETED_TASK:
      return [...remainingTasks, action.completedTask];

    default:
      return state;
  }
};
