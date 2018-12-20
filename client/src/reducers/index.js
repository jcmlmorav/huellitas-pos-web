import { combineReducers } from 'redux';
import inventory from './inventory';
import billings from './billings';
import sales from './sales';

export default combineReducers({
  inventory,
  billings,
  sales,
});
