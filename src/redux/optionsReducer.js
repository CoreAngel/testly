import { createSlice } from '@reduxjs/toolkit';
import { runTypes } from 'static/run';

const optionsSlice = createSlice({
    name: 'options',
    initialState: {
        questions: runTypes.RANDOM,
        answers: runTypes.RANDOM,
        animationTime: 200,
    },
    reducers: {
        setQuestions: (state, action) => ({ ...state, questions: action.payload }),
        setAnswers: (state, action) => ({ ...state, answers: action.payload }),
        setAnimationTime: (state, action) => ({ ...state, animationTime: action.payload }),
    },
});

const { actions, reducer } = optionsSlice;
const { setQuestions, setAnswers, setAnimationTime } = actions;
export { setQuestions, setAnswers, setAnimationTime };
export default reducer;
