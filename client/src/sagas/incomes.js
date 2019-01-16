import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import FinancesApi from '../api/finances';

function* getIncomes() {
  try {
    const incomes = yield call(FinancesApi.getIncomes);

    yield put({type: TYPES.GET_INCOMES_SUCCEEDED, payload: incomes.data});
  } catch (e) {
    yield put({type: TYPES.GET_INCOMES_FAILED, message: e.message});
  }
}

function* incomesSaga() {
  yield takeLatest(TYPES.GET_INCOMES, getIncomes);
}

export default incomesSaga;
