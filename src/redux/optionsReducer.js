import { createSlice } from '@reduxjs/toolkit';
import { runTypes } from 'static/run';

const optionsSlice = createSlice({
    name: 'options',
    initialState: {
        questions: runTypes.RANDOM,
        answers: runTypes.RANDOM,
        animationTime: 200,
        animation: true,
    },
    reducers: {
        setQuestions: (state, action) => ({ ...state, questions: action.payload }),
        setAnswers: (state, action) => ({ ...state, answers: action.payload }),
        setAnimation: (state, action) => ({
            ...state,
            animationTime: action.payload ? 200 : 0,
            animation: action.payload,
        }),
    },
});

const { actions, reducer } = optionsSlice;
const { setQuestions, setAnswers, setAnimation } = actions;
export { setQuestions, setAnswers, setAnimation };
export default reducer;
