import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import ProductsApi from '../api/products';

function* fetchProduct(action) {
  try {
    const product = yield call(ProductsApi.get, action.payload);

    yield put({type: TYPES.GET_PRODUCT_SUCCEEDED, payload: product.data});
  } catch (e) {
    yield put({type: TYPES.GET_PRODUCT_FAILED, message: e.message});
  }
}

function* productSaga() {
  yield takeLatest(TYPES.GET_PRODUCT, fetchProduct);
}

export default productSaga;
