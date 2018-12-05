import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import ProductsApi from '../api/products';

function* fetchProducts() {
  try {
    const products = yield call(ProductsApi.getAll);

    yield put({type: TYPES.GET_PRODUCTS_SUCCEEDED, payload: products.data});
  } catch (e) {
    yield put({type: TYPES.GET_PRODUCTS_FAILED, message: e.message});
  }
}

function* productsSaga() {
  yield takeLatest(TYPES.GET_PRODUCTS, fetchProducts);
}

export default productsSaga;
