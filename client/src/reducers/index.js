import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import resident from './resident';

export default combineReducers({ alert, auth, resident });
