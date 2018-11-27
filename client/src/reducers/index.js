import { combineReducers } from 'redux';
import inventory from './inventory';
import billings from './billings';

export default combineReducers({
  inventory,
  billings,
});
