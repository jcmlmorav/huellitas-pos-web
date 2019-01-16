import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import FinancesApi from '../api/finances';

function* getIncomesResume() {
  try {
    const incomesResume = yield call(FinancesApi.getIncomesResume);

    yield put({type: TYPES.GET_INCOMES_RESUME_SUCCEEDED, payload: incomesResume.data});
  } catch (e) {
    yield put({type: TYPES.GET_INCOMES_RESUME_FAILED, message: e.message});
  }
}

function* incomesResumeSaga() {
  yield takeLatest(TYPES.GET_INCOMES_RESUME, getIncomesResume);
}

export default incomesResumeSaga;
