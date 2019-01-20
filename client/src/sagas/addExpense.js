import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import FinancesApi from '../api/finances';

function* addExpense(action) {
  try {
    const expense = yield call(FinancesApi.addExpense, action.payload);

    yield put({type: TYPES.ADD_EXPENSE_SUCCEEDED, payload: expense});
  } catch (e) {
    yield put({type: TYPES.ADD_EXPENSE_FAILED, message: e.message});
  }
}

function* addExpenseSaga() {
  yield takeLatest(TYPES.ADD_EXPENSE, addExpense);
}

export default addExpenseSaga;
