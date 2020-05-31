import axios from 'axios';
import {CREATE_TASK, GET_TASKS} from '../constants';

const getTasks = tasks => ({
  type: GET_TASKS,
  tasks,
});

const createTask = newTask => ({
  type: CREATE_TASK,
  newTask,
});

export const getTasksThunk = () => {
  return dispatch => {
    return axios
      .get('https://listthisbackend.herokuapp.com/api/tasks/')
      .then(res => res.data)
      .then(tasks => dispatch(getTasks(tasks)));
  };
};

export const createTaskThunk = (listId, newTask) => {
  return dispatch => {
    return axios
      .post(
        `https://listthisbackend.herokuapp.com/api/list/${listId}/tasks`,
        newTask,
      )
      .then(res => res.data)
      .then(task => dispatch(createTask(task)));
  };
};
