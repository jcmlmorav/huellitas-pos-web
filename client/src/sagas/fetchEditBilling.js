import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import BillingsApi from '../api/billings';

function* fetchEditBilling(action) {
  const billing = yield call(BillingsApi.get, action.payload.id);

  yield put({type: TYPES.FETCH_EDIT_BILLING_SUCCEEDED, payload: billing.data});
}

function* fetchEditBillingSaga() {
  yield takeLatest(TYPES.FETCH_EDIT_BILLING, fetchEditBilling);
}

export default fetchEditBillingSaga;
