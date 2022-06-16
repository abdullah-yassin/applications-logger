import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import rootSaga from './Sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(() => {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export { store };
