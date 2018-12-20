import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import SalesApi from '../api/sales';

function* fetchSales() {
  try {
    const sales = yield call(SalesApi.getAll);

    yield put({type: TYPES.GET_SALES_SUCCEEDED, payload: sales.data});
  } catch (e) {
    yield put({type: TYPES.GET_SALES_FAILED, message: e.message});
  }
}

function* salesSaga() {
  yield takeLatest(TYPES.GET_SALES, fetchSales);
}

export default salesSaga;
