import { createStore, applyMiddleware, compose } from 'redux';
import { isDevelopment } from 'src/functions/environment';
import createSagaMiddleware from 'redux-saga';
import { sampleSaga } from 'src/store/sagas';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const sagas = [
    sampleSaga,
];

const enhancers = [];
const middlewares = [
    sagaMiddleware,
];

if (isDevelopment()) {
    const { __REDUX_DEVTOOLS_EXTENSION__ } = window;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(__REDUX_DEVTOOLS_EXTENSION__());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers,
);

export const getStore = (initialState = {}) => {
    const store = createStore(
        rootReducer,
        initialState,
        composedEnhancers,
    );

    if (isDevelopment()) {
        if (module.hot) {
            module.hot.accept('./reducers', () => {
                store.replaceReducer(rootReducer);
            });
        }
    }

    sagas.map(saga => sagaMiddleware.run(saga));

    return store;
};
