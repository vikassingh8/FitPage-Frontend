import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

// Redux Saga Middleware
import createSagaMiddleware from "redux-saga";
import rootSaga from "./Sagas/rootSaga";

// Redux Reducers
import rootReducer from "./Reducers";

const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	const middleware = [sagaMiddleware];

	const composeEnhancers = composeWithDevTools({
		// Specify here name, actionsDenylist, actionsCreators and other options
	});

	const enhancers = composeEnhancers(applyMiddleware(...middleware));

	const store = createStore(rootReducer, enhancers);

	sagaMiddleware.run(rootSaga);

	return store;
};

export default configureStore();
