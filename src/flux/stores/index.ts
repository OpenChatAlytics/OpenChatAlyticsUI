import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from 'src/flux/reducers';
import sagas from 'src/flux/sagas';
import { browserHistory } from 'react-router';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';

const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware(browserHistory);
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, routerMiddleware),
);

sagaMiddleware.run(sagas);

export default store;