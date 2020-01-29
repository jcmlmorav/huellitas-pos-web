import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import BillingsApi from '../api/billings';

function* fetchBillings() {
  try {
    const billings = yield call(BillingsApi.getAll);

    yield put({type: TYPES.GET_BILLINGS_SUCCEEDED, payload: billings.data});
  } catch (e) {
    yield put({type: TYPES.GET_BILLINGS_FAILED, message: e.message});
  }
}

function* bilingsSaga() {
  yield takeLatest(TYPES.GET_BILLINGS, fetchBillings);
}

export default bilingsSaga;
