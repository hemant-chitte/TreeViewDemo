import api from '../utils/api';
import { GET_REPOSITORIES,REPOSITORIES_ERROR,GET_PULL_REQUESTS,PULL_REQUESTS_ERROR,GET_COMMITS,COMMITS_ERROR } from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get public repositories of the user
export const getRepositories = (username) => async (dispatch) => {
  console.log("get Repositories");
  try {
    const res = await api.get(`/repository/${username}`);

    dispatch({
      type: GET_REPOSITORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REPOSITORIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get pull requests of specific user
export const getPullRequests = (username) => async (dispatch) => {
  try {
    const res = await api.get(`/pulls/${username}`);

    dispatch({
      type: GET_PULL_REQUESTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PULL_REQUESTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get commits against pull request
export const getCommits = (username,repositoryname,pullnumber) => async (dispatch) => {
  try {
    const res = await api.get(`/commits/${username}/${repositoryname}/${pullnumber}`);

    dispatch({
      type: GET_COMMITS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMMITS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

