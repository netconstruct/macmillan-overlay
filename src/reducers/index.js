import { combineReducers } from 'redux';
import entities from './entities';
import notifications from './notifications';

export default combineReducers({ entities, notifications });
