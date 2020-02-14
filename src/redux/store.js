import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './questionsReducer';
import testReducer from './testReducer';
import optionsReducer from './optionsReducer';

const store = configureStore({
    reducer: {
        questions: questionsReducer,
        test: testReducer,
        options: optionsReducer,
    },
});

export default store;
