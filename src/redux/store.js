import { configureStore } from '@reduxjs/toolkit';
import questionStore from './questionStore';
import testStore from './testStore';

const store = configureStore({
    reducer: {
        question: questionStore,
        test: testStore,
    },
});

export default store;
