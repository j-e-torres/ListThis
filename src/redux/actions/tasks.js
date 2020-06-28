import axios from 'axios';
import {
  GET_TASKS,
  COMPLETED_TASK,
  DELETE_TASK,
  CREATE_TASKS,
  DELETE_LIST_TASK,
  REFRESH_LISTS,
} from '../constants';

const getTasks = tasks => ({
  type: GET_TASKS,
  tasks,
});

const createTasks = newTasks => ({
  type: CREATE_TASKS,
  newTasks,
});

const completeTask = completedTask => ({
  type: COMPLETED_TASK,
  completedTask,
});

const deleteTask = deletedTask => ({
  type: DELETE_TASK,
  deletedTask,
});

const deleteTaskFromList = deleteListTask => ({
  type: DELETE_LIST_TASK,
  deleteListTask,
});

const refreshLists = updatedList => ({
  type: REFRESH_LISTS,
  updatedList,
});

export const getTasksThunk = () => {
  return dispatch => {
    return axios
      .get('https://listthisbackend.herokuapp.com/api/tasks')
      .then(res => res.data)
      .then(tasks => dispatch(getTasks(tasks)));
  };
};

export const createTasksThunk = (listId, tasks) => {
  return dispatch => {
    return axios
      .post(
        `https://listthisbackend.herokuapp.com/api/lists/${listId}/tasks`,
        tasks,
      )
      .then(res => res.data)
      .then(list => {
        dispatch(createTasks(list.tasks));
        return list;
      })
      .then(_list => dispatch(refreshLists(_list)));
  };
};

export const completeTaskThunk = taskId => {
  return dispatch => {
    return axios
      .put(`https://listthisbackend.herokuapp.com/api/tasks/${taskId}`)
      .then(res => res.data)
      .then(task => dispatch(completeTask(task)));
  };
};

export const deleteTaskThunk = task => {
  return dispatch => {
    return axios
      .delete(`https://listthisbackend.herokuapp.com/api/tasks/${task.id}`)
      .then(() => dispatch(deleteTask(task)))
      .then(() => dispatch(deleteTaskFromList(task)));
  };
};
