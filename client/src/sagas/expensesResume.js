import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import FinancesApi from '../api/finances';

function* getExpensesResume() {
  try {
    const expensesResume = yield call(FinancesApi.getExpensesResume);

    yield put({type: TYPES.GET_EXPENSES_RESUME_SUCCEEDED, payload: expensesResume.data});
  } catch (e) {
    yield put({type: TYPES.GET_EXPENSES_RESUME_FAILED, message: e.message});
  }
}

function* expensesResumeSaga() {
  yield takeLatest(TYPES.GET_EXPENSES_RESUME, getExpensesResume);
}

export default expensesResumeSaga;
