import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REGISTER, REHYDRATE, PAUSE, PURGE, PERSIST } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import listReducer from './listReducer';
import testReducer from './testReducer';
import optionsReducer from './optionsReducer';
import addedListReducer from './addedListReducer';
import createReducer from './createReducer';

const reducer = combineReducers({
    list: listReducer,
    test: testReducer,
    addedList: addedListReducer,
    options: optionsReducer,
    create: createReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['options', 'addedList', 'create'],
    blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});
export const persistor = persistStore(store);
