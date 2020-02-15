import { configureStore } from '@reduxjs/toolkit';
import listReducer from './listReducer';
import testReducer from './testReducer';
import optionsReducer from './optionsReducer';

const store = configureStore({
    reducer: {
        list: listReducer,
        test: testReducer,
        options: optionsReducer,
    },
});

export default store;
