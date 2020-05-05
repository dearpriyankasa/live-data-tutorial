import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import liveData from './reducer/liveData.reducer';
import watcherSaga from './saga/liveData.saga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const store = createStore(liveData, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(watcherSaga);
  return store;
}