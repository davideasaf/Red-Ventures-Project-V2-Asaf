import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import rootReducer from '../reducers';

// const reducer = (state={}, action) => {
//   return state;
// }


const middleware = applyMiddleware(promise(), thunk, logger());

// const store =  createStore(reducer, middleware);

// store.dispatch({ type: 'FOO' });

export default createStore(rootReducer, middleware);

// export default function configureStore(initialState) {
//   const store = createStore(
//     rootReducer,
//     middleware,
//     initialState,
//     window.devToolsExtension ? window.devToolsExtension() : undefined
//   );
//
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextRootReducer = require('../reducers').default;
//       store.replaceReducer(nextRootReducer);
//     });
//   }
//
//   return store;
// }
