import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import SalesApi from '../api/sales';

function* fetchSalesResume() {
  try {
    const salesResume = yield call(SalesApi.getResume);

    yield put({type: TYPES.GET_SALES_RESUME_SUCCEEDED, payload: salesResume.data});
  } catch (e) {
    yield put({type: TYPES.GET_SALES_RESUME_FAILED, message: e.message});
  }
}

function* salesResumeSaga() {
  yield takeLatest(TYPES.GET_SALES_RESUME, fetchSalesResume);
}

export default salesResumeSaga;
