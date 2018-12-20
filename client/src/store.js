import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import productsSaga from './sagas/products';
import addProductSaga from './sagas/addProduct';
import updateProductSaga from './sagas/updateProduct';
import productSaga from './sagas/product';
import addBilingSaga from './sagas/addBilling';
import salesSaga from './sagas/sales';
import salesResumeSaga from './sagas/salesResume';
import billingsSaga from './sagas/billings';

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  rootReducer,
  applyMiddleware(
    logger,
    sagaMiddleware
  )
);

sagaMiddleware.run(productsSaga);
sagaMiddleware.run(addProductSaga);
sagaMiddleware.run(updateProductSaga);
sagaMiddleware.run(productSaga);
sagaMiddleware.run(addBilingSaga);
sagaMiddleware.run(salesSaga);
sagaMiddleware.run(salesResumeSaga);
sagaMiddleware.run(billingsSaga);

export default store;
