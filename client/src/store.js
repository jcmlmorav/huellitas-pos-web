import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import productsSaga from './sagas/products';
import addProductSaga from './sagas/addProduct';
import updateProductSaga from './sagas/updateProduct';

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

export default store;
