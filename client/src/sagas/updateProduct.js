import { call, put, takeLatest } from 'redux-saga/effects';
import TYPES from '../constants/types';
import ProductsApi from '../api/products';

function* updateProduct(action) {
  try {
    const product = yield call(ProductsApi.update, action.payload);

    yield put({type: TYPES.UPDATE_PRODUCT_SUCCEEDED, payload: product});
  } catch (e) {
    yield put({type: TYPES.UPDATE_PRODUCT_FAILED, message: e.message});
  }
}

function* updateProductSaga() {
  yield takeLatest(TYPES.UPDATE_PRODUCT, updateProduct);
}

export default updateProductSaga;
