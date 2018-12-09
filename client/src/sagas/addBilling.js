import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import BillingsApi from '../api/billings';

function* addBilling(action) {
  try {
    const billing = yield call(BillingsApi.add, action.payload);

    yield put({type: TYPES.ADD_BILLING_SUCCEEDED, payload: billing});
  } catch (e) {
    yield put({type: TYPES.ADD_BILLING_FAILED, message: e.message});
  }
}

function* addBilingSaga() {
  yield takeLatest(TYPES.ADD_BILLING, addBilling);
}

export default addBilingSaga;
