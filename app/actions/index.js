import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  FETCH_GRADES,
  GRADES_ERROR,
  SELECTED_CLASS,
  REMOVE_GRADES,
  ADD_CLASS,
  ERR_CLASS,
  REMOVE_ALERT,
  GET_CLASSES,
  ADD_USER_CLASS,
  ERR_USER_CLASS,
  DELETE_USER_CLASS,
  GET_USER_CLASSES,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

const API_URL = '/api';

// Action creator to get grades from API
export function fetchGrades({id, url}) {
  return function(dispatch) {
    axios.get(`${API_URL}/scrape?id=${id}&url=${url}`)
      .then(response => {
        dispatch({ type: FETCH_GRADES, payload: response });
      })
      .catch(error => {
        dispatch({ type: GRADES_ERROR, payload: error.response.data });
      });
  }
}

// Action creator to select a class
export function selectClass(selected) {
  return {
    type: SELECTED_CLASS,
    payload: selected
  }
}

// Action creator to return grades state to original form
export function removeGrades() {
  return {
    type: REMOVE_GRADES
  }
}

// Action creator to add a class
export function addClass(url) {
  return function(dispatch) {
    axios.post(`${API_URL}/classes`, {
      url: url
    })
      .then(response => {
        dispatch({ type: ADD_CLASS });
      })
      .catch(err => {
        dispatch({ type: ERR_CLASS, payload: err.response.data });
      });
  }
}

// Action creator to remove alerts for classes
export function removeAlert() {
  return {
    type: REMOVE_ALERT
  };
}

// Action creator to get classes
export function getClasses() {
  return function(dispatch) {
    axios.get(`${API_URL}/classes`)
      .then(response => {
        dispatch({ type: GET_CLASSES, payload: response.data })
      })
      .catch(err => {
        dispatch({ type: ERR_CLASS, payload: err.response.data });
      });
  }
}

// Action creator to get the classes of a single user
export function getUserClasses() {
  return function(dispatch) {
    axios.get(`${API_URL}/me/classes`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: GET_USER_CLASSES,
          payload: response.data
        });
      });
  }
}

// Action creator to add a class to a single user
export function addUserClass(id, name) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${API_URL}/me/classes`,
      data: {
        id: id,
        name: name
      },
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: ADD_USER_CLASS
        });
      })
      .catch(err => {
        dispatch({
          type: ERR_USER_CLASS,
          payload: err.response.data
        });
      });
  }
}

// Action creator to remove a class of a user
export function removeUserClass(id) {
  return function(dispatch) {
    axios.delete(`${API_URL}/me/classes/${id}`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: DELETE_USER_CLASS
        });
      })
      .catch(err => {
        dispatch({
          type: ERR_USER_CLASS,
          payload: err.response.data
        });
      });
  }
}

// Action creator to log in user
export function userLogin({ username, password }) {
  return function(dispatch) {
    axios.post('/login', { username, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/classes');
      })
      .catch(error => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

// Action creator to sign up user
export function userSignup({ username, password }) {
  return function(dispatch) {
    axios.post('/signup', { username, password})
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/classes');
      })
      .catch(error => {
        dispatch(authError(error.response.data.error));
      });
  }
}

// Action creator to sign out user
export function userSignout(user) {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  }
}

// Helper function for authentication related errors
function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
