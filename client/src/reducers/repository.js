import {
  GET_REPOSITORIES,
  REPOSITORIES_ERROR,
  GET_PULL_REQUESTS,
  PULL_REQUESTS_ERROR,
  GET_COMMITS,
  COMMITS_ERROR
} from '../actions/types';

const initialState = {
  repositories: [],
  pullRequets: [],
  commits: [],
  error: {}
};

function repositoryReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_REPOSITORIES:
      return {
        ...state,
        repositories: payload,
        loading: false
      };
    case GET_PULL_REQUESTS:
      return {
        ...state,
        pullRequets: payload,
        loading: false
      };
      case GET_COMMITS:
      return {
        ...state,
        commits: payload,
        loading: false
      };
    case REPOSITORIES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        repositories: []
      };
      case PULL_REQUESTS_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
          pullRequets: []
        };
    case COMMITS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        commits: []
      };
    default:
      return state;
  }
}

export default repositoryReducer;
