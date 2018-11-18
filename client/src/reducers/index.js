import { combineReducers } from 'redux';
import inventory from './inventory';
import { createForms } from 'react-redux-form';

export default combineReducers({
  inventory,
  ...createForms({
    product: []
  }),
});
