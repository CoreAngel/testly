import {createSlice} from '@reduxjs/toolkit'

const questionsSlice = createSlice({
    name: 'questions',
    initialState: [],
    reducers: {
        setQuestions: (state, action) => [...action.payload],
    }
});

const { actions, reducer } = questionsSlice;
const { setQuestions } = actions;
export {setQuestions}
export default reducer;
