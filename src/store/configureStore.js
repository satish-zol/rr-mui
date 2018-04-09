//if (process.env.NODE_ENV == 'production') {
//    module.exports = require('./configureStore.prod');
//} else {
//    module.exports = require('./configureStore.dev');
//}

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
//import {createLogger} from 'redux-logger';
//import api from '../middleware/leadsApi';
import rootReducer from '../reducers/rootReducers';
//import DevTools from '../containers/DevTools';

const configureStore = () => {
    const store = createStore(
			  rootReducer,
        applyMiddleware(thunk)
    	  	// createLogger(),
          // DevTools.instrument() )
	  );

    if (module.hot) {
        //Enable webpack hot module replacement for reducers
        module.hot.accept('../reducers/rootReducers', () => {
            store.replaceReducer(rootReducer)
        })
    }

    return store;
}

export default configureStore;
