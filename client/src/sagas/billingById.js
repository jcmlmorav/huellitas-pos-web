import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import BillingsApi from '../api/billings';

export function* getBillingById(action) {
  try {
    const billing = yield call(BillingsApi.get, action.payload);

    yield put({type: TYPES.GET_BILLING_BY_ID_SUCCEEDED, payload: billing.data});
  } catch (e) {
    yield put({type: TYPES.GET_BILLING_BY_ID_FAILED, message: e.message});
  }
}

function* billingByIdSaga() {
  yield takeLatest(TYPES.GET_BILLING_BY_ID, getBillingById);
}

export default billingByIdSaga;
