import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import BillingsApi from '../api/billings';

function* getLastBilling() {
  try {
    const billing = yield call(BillingsApi.getLast);

    yield put({type: TYPES.GET_LAST_BILLING_SUCCEEDED, payload: billing.data});
  } catch (e) {
    yield put({type: TYPES.GET_LAST_BILLING_FAILED, message: e.message});
  }
}

function* lastBilingSaga() {
  yield takeLatest(TYPES.GET_LAST_BILLING, getLastBilling);
}

export default lastBilingSaga;
