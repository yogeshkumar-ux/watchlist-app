import { createStore, combineReducers, applyMiddleware,compose  } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import { composeWithDevTools } from 'redux-devtools-extension';
import {thunk} from 'redux-thunk';
import userReducer from './Reducers/userReducer';
import movieReducer from './Reducers/movieReducer';
// import watchlistReducer from './Reducers/watchlistReducer';
// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  movies: movieReducer,
  // watchlist: watchlistReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };













