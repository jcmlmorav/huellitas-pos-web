import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import FinancesApi from '../api/finances';

function* addIncome(action) {
  try {
    const income = yield call(FinancesApi.addIncome, action.payload);

    yield put({type: TYPES.ADD_INCOME_SUCCEEDED, payload: income});
  } catch (e) {
    yield put({type: TYPES.ADD_INCOME_FAILED, message: e.message});
  }
}

function* addIncomeSaga() {
  yield takeLatest(TYPES.ADD_INCOME, addIncome);
}

export default addIncomeSaga;
