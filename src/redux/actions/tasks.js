import axios from 'axios';
import {CREATE_TASK, GET_TASKS, COMPLETED_TASK} from '../constants';

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
      .then(task => {
        console.log('thunk completeTaskThunk', task);
        dispatch(completeTask(task));
      });
  };
};
