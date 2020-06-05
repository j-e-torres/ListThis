import axios from 'axios';
import {
  CREATE_TASK,
  GET_TASKS,
  COMPLETED_TASK,
  DELETE_TASK,
} from '../constants';

const getTasks = tasks => ({
  type: GET_TASKS,
  tasks,
});

const createTask = newTask => ({
  type: CREATE_TASK,
  newTask,
});

const completeTask = completedTask => ({
  type: COMPLETED_TASK,
  completedTask,
});

const deleteTask = deletedTask => ({
  type: DELETE_TASK,
  deletedTask,
});

export const getTasksThunk = () => {
  return dispatch => {
    return axios
      .get('https://listthisbackend.herokuapp.com/api/tasks')
      .then(res => res.data)
      .then(tasks => dispatch(getTasks(tasks)));
  };
};

export const createTaskThunk = (listId, newTask) => {
  return dispatch => {
    return axios
      .post(
        `https://listthisbackend.herokuapp.com/api/lists/${listId}/tasks`,
        newTask,
      )
      .then(res => res.data)
      .then(task => dispatch(createTask(task)));
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
      .then(() => dispatch(deleteTask(task)));
  };
};
