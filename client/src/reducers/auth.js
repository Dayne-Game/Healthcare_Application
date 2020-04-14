import {
  REGISTER_SUCCESS,
  RESTHOME_LOADED,
  LOGIN_SUCCESS,
  LOGOUT
} from '../actions/types';

const initalState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  resthome: null
};

export default function(state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case RESTHOME_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        resthome: payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        resthome: payload.company
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        resthome: null
      };
    default:
      return state;
  }
}
