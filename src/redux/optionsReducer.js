import { createSlice } from '@reduxjs/toolkit';
import { runTypes } from 'static/run';

const optionsSlice = createSlice({
    name: 'options',
    initialState: {
        questions: runTypes.RANDOM,
        answers: runTypes.RANDOM,
    },
    reducers: {
        setQuestions: (state, action) => ({ ...state, questions: action.payload }),
        setAnswers: (state, action) => ({ ...state, answers: action.payload }),
    },
});

const { actions, reducer } = optionsSlice;
const { setQuestions, setAnswers } = actions;
export { setQuestions, setAnswers };
export default reducer;
