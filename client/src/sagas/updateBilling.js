import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import BillingsApi from '../api/billings';

function* updateBilling(action) {
  try {
    const billing = yield call(BillingsApi.update, action.payload);

    yield put({type: TYPES.UPDATE_BILLING_SUCCEEDED, payload: billing});
  } catch (e) {
    yield put({type: TYPES.UPDATE_BILLING_FAILED, message: e.message});
  }
}

function* updateBilingSaga() {
  yield takeLatest(TYPES.UPDATE_BILLING, updateBilling);
}

export default updateBilingSaga;
