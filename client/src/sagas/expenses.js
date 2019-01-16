import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import FinancesApi from '../api/finances';

function* getExpenses() {
  try {
    const expenses = yield call(FinancesApi.getExpenses);

    yield put({type: TYPES.GET_EXPENSES_SUCCEEDED, payload: expenses.data});
  } catch (e) {
    yield put({type: TYPES.GET_EXPENSES_FAILED, message: e.message});
  }
}

function* expensesSaga() {
  yield takeLatest(TYPES.GET_EXPENSES, getExpenses);
}

export default expensesSaga;
