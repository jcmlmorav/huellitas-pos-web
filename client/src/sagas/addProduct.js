import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import ProductsApi from '../api/products';

function* addProduct(action) {
  try {
    const product = yield call(ProductsApi.add, action.payload);

    yield put({type: TYPES.ADD_PRODUCT_SUCCEEDED, payload: product});
  } catch (e) {
    yield put({type: TYPES.ADD_PRODUCT_FAILED, message: e.message});
  }
}

function* addProductSaga() {
  yield takeLatest(TYPES.ADD_PRODUCT, addProduct);
}

export default addProductSaga;
