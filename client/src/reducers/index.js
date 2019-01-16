import { combineReducers } from 'redux';
import inventory from './inventory';
import billings from './billings';
import sales from './sales';
import finances from './finances';

export default combineReducers({
  inventory,
  billings,
  sales,
  finances
});
